import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const AIRTABLE_API_URL = 'https://api.airtable.com/v0'

// Max requests per IP within a rolling window.
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = '60 s'
const RATE_LIMIT_WINDOW_MS = 60 * 1000

// Durable, cross-instance rate limiting via Upstash Redis when configured.
// Falls back to a per-instance in-memory limiter for local dev / missing config.
const redisConfigured =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN

const ratelimit = redisConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, RATE_LIMIT_WINDOW),
      prefix: 'waitlist',
      analytics: true,
    })
  : null

const requestLog = new Map()

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimitedInMemory(ip) {
  const now = Date.now()
  const timestamps = (requestLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  )

  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  requestLog.set(ip, timestamps)

  // Opportunistically prune stale entries to bound memory growth.
  if (requestLog.size > 10000) {
    for (const [key, times] of requestLog) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        requestLog.delete(key)
      }
    }
  }

  return false
}

async function isRateLimited(ip) {
  if (ratelimit) {
    try {
      const { success } = await ratelimit.limit(ip)
      return !success
    } catch (error) {
      // If Redis is unreachable, fall back to in-memory rather than failing open.
      console.error('Rate limit (Redis) error, falling back to in-memory:', error)
      return isRateLimitedInMemory(ip)
    }
  }
  return isRateLimitedInMemory(ip)
}

async function addToWaitlist(email) {
  const response = await fetch(
    `${AIRTABLE_API_URL}/${process.env.AIR_TABLE_BASE_ID}/Waitlist`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIR_TABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          email: email,
          createdAt: new Date().toISOString().split('T')[0],
        },
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    console.error('Airtable error:', error)
    throw new Error(error.error?.message || `Failed to add to waitlist: ${response.status}`)
  }

  return response.json()
}

export async function POST(request) {
  const ip = getClientIp(request)
  if (await isRateLimited(ip)) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    )
  }

  const body = await request.json().catch(() => null)
  const email = body?.email

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ message: 'Valid email required.' }, { status: 400 })
  }

  try {
    await addToWaitlist(email)
    return NextResponse.json({ message: 'Email received.' })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
