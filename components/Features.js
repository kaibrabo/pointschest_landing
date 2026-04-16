import styles from './Features.module.css'

const features = [
  {
    icon: '🔍  Dining, Gas, Groceries, Hotels, Rentals',
    title: 'Search by category',
    description:
      'Find cards that earn the most on dining, travel, gas, groceries, streaming, and more. No guesswork.',
  },
  {
    icon: '10x on Hotels, 4x on Gas, 3x on Groceries',
    title: 'Ranked by reward rate',
    description:
      'Results are instantly sorted by the highest reward rate for your category so the best card is always at the top.',
  },
  {
    icon: '⭐ Star Cards',
    title: 'Build your Wallet',
    description:
      'Star cards to build a personal wallet. Your top picks float to the top of the list for quick access.',
  },
  {
    icon: 'Apply Now →',
    title: 'Get the Best Offers',
    description:
      'Every card links directly to the official issuer. No middlemen, no affiliate hoops — just a clean handoff.',
  },
]

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Everything you need to pick the right card</h2>
          <p className={styles.subtitle}>
            Simple tools, zero noise.
          </p>
        </div>

        <ul className={styles.grid}>
          {features.map((feature) => (
            <li key={feature.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <span className={styles.icon} aria-hidden="true">
                {feature.icon}
              </span>
              <p className={styles.cardDesc}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
