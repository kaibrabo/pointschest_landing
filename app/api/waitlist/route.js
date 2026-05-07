import { NextResponse } from 'next/server'

const AIRTABLE_API_URL = 'https://api.airtable.com/v0'

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
    throw new Error(error.error?.message || 'Failed to add to waitlist')
  }

  return response.json()
}

export async function POST(request) {
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
