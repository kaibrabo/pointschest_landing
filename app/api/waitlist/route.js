import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

const SECRET = process.env.WAITLIST_SECRET
const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'waitlist.json')

function ensureSecret() {
  if (!SECRET) {
    throw new Error('Missing WAITLIST_SECRET environment variable.')
  }
}

function encryptEmail(email) {
  const salt = crypto.randomBytes(16)
  const iv = crypto.randomBytes(12)
  const key = crypto.pbkdf2Sync(SECRET, salt, 100_000, 32, 'sha256')
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const ciphertext = Buffer.concat([cipher.update(email, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()

  return {
    salt: salt.toString('hex'),
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
    ciphertext: ciphertext.toString('hex'),
  }
}

function decryptEmail(encrypted) {
  const salt = Buffer.from(encrypted.salt, 'hex')
  const iv = Buffer.from(encrypted.iv, 'hex')
  const tag = Buffer.from(encrypted.tag, 'hex')
  const ciphertext = Buffer.from(encrypted.ciphertext, 'hex')

  const key = crypto.pbkdf2Sync(SECRET, salt, 100_000, 32, 'sha256')
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)

  const plaintext = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]).toString('utf8')

  return plaintext
}

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf8')
  }
}

async function appendRecord(record) {
  const text = await fs.readFile(DATA_FILE, 'utf8')
  let data = []
  try {
    data = JSON.parse(text)
    if (!Array.isArray(data)) data = []
  } catch {
    data = []
  }

  data.push(record)
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
}

export async function POST(request) {
  try {
    ensureSecret()
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  const body = await request.json().catch(() => null)
  const email = body?.email

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ message: 'Valid email required.' }, { status: 400 })
  }

  const encrypted = encryptEmail(email)
  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    salt: encrypted.salt,
    iv: encrypted.iv,
    tag: encrypted.tag,
    ciphertext: encrypted.ciphertext,
  }

  await ensureStorage()
  await appendRecord(record)

  return NextResponse.json({ message: 'Email received.' })
}
