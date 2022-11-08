import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
const Home: NextPage = () => {
return (
   <div className={styles.container}>
   <Head>
     <title>Todos app</title>
     <meta name="description" content="Next.js firebase todos app" />
     <link rel="icon" href="/favicon.ico" />
   </Head>
   <main className={styles.main}>
     <h1 className={styles.title}>
     Todos app
     </h1>
   </main>
   <footer className={styles.footer}>
     <a
     href="#"
     rel="noopener noreferrer"
     >
     Todos app
     </a>
   </footer>
   </div>
)
}
export default Home