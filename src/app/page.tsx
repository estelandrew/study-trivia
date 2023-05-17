import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div style={{marginTop: '25rem', textAlign: 'center'}}>This is my page.</div>
    </main>
  )
}
