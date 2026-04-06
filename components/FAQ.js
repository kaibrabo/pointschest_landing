'use client'

import { useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  {
    question: 'Is PointsChest free to use?',
    answer:
      'Yes. The core app — browsing cards, searching by category, and saving favorites — is completely free. Future advanced features may be offered as a premium tier.',
  },
  {
    question: 'How is the reward rate data sourced?',
    answer:
      'Card data is curated manually from official issuer websites. Rates, APRs, and bonuses change frequently, so we include a "rates as of [date]" disclaimer on each card. Always confirm terms with the issuer before applying.',
  },
  {
    question: 'Does PointsChest apply for cards on my behalf?',
    answer:
      'No. Tapping "Apply Now" opens the official card issuer\'s website in your browser. PointsChest never handles your personal or financial information.',
  },
  {
    question: 'Which credit card categories does the app support?',
    answer:
      'Dining, travel, gas, groceries, streaming, online shopping, and general/all purchases are supported in the current version. More categories will be added over time.',
  },
  {
    question: 'When will the app be available on iOS and Android?',
    answer:
      'We\'re targeting a launch on the App Store and Google Play in the near term. Sign up above and we\'ll notify you the moment it goes live.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  function toggle(index) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Frequently asked questions</h2>
        </div>

        <ul className={styles.list}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <li key={index} className={styles.item}>
                <button
                  className={styles.question}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true">
                    ›
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.answer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
