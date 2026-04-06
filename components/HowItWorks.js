import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    title: 'Search a spending category',
    description:
      'Type in what you spend on most — dining, travel, gas, groceries, or any other category.',
  },
  {
    number: '02',
    title: 'See the top-earning cards',
    description:
      'PointsChest instantly sorts every card by its reward rate for that category, highest first.',
  },
  {
    number: '03',
    title: 'Apply directly to the issuer',
    description:
      'Tap "Apply Now" to go straight to the card issuer\'s official page — no middlemen, no redirects.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.heading}>
          <h2 className={styles.title}>How it works</h2>
          <p className={styles.subtitle}>
            Three steps from search to application.
          </p>
        </div>

        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.number} className={styles.step}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
