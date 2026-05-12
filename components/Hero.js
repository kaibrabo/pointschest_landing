'use client'

import { useState, useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.message || 'Unable to submit email.')
      }

      setSubmitted(true)
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.section} id="waitlist">
      <div className={`container ${styles.inner}`}>

        {/* ── Left: copy + form ── */}
        <div className={styles.content}>
          <div className={styles.badge}>Now in beta</div>

          <h1 className={styles.headline}>
            Find the best credit card
            <br />
            for how you <i>actually</i> spend.
          </h1>

          <p className={styles.subheadline}>
            Search by category — dining, travel, gas, groceries — and instantly
            see which cards earn the highest reward rates. Save your favorites and
            apply in one tap.
          </p>

          {submitted ? (
            <div className={styles.confirm}>
              <p>
                <strong>You&rsquo;re on the list! </strong>
                <span className={styles.confirmIcon}>✓</span>
              </p>
              <p>
                We&rsquo;ll email you when PointsChest launches.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <input
                ref={inputRef}
                id="waitlist-email"
                className={styles.input}
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                disabled={loading}
              />
              <button className={styles.submit} type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Get Early Access'}
              </button>
            </form>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <p className={styles.privacy}>No spam. Unsubscribe any time.</p>

          <div className={styles.badges}>
            <span className={styles.storeBadge} aria-disabled="true" title="Coming Soon...">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </span>
            <span className={styles.storeBadge} aria-disabled="true" title="Coming Soon...">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.18 23.77A2 2 0 0 1 2 22V2a2 2 0 0 1 1.18-1.77L13.5 12zM16.5 9L5.33.2 14.76 9zM5.33 23.8L16.5 15l-1.74-1.74zM21.5 10.85l-2.96-1.71L16.5 12l2.04 2.04 3-1.73a1 1 0 0 0 0-1.46z" />
              </svg>
              Google Play
            </span>
          </div>
        </div>

        {/* ── Right: app screenshot ── */}
        <div className={styles.mockup}>
          <img
            src="/light-sim-hero.png"
            alt="PointsChest app screenshot"
            className={styles.mockupImg}
          />
        </div>

      </div>
    </section>
  )
}
