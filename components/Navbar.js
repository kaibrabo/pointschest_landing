'use client'

import styles from './Navbar.module.css'

export default function Navbar() {
  function handleGetAccess(e) {
    e.preventDefault()
    const input = document.getElementById('waitlist-email')
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => input.focus(), 400)
    }
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo}>
          <img src="/black_chest_logo.png" alt="PointsChest" className={styles.logoImg} />
          <span className={styles.logoText}>PointsChest</span>
        </a>
        <a href="#waitlist" className={styles.cta} onClick={handleGetAccess}>
          Get Early Access
        </a>
      </div>
    </header>
  )
}
