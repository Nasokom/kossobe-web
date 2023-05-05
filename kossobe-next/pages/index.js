import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Pages/Home.module.css'
import Hero from '../component/content/Hero'
import { client } from '../Utils/sanityClient'
import CategList from '../component/content/CategList'

export default function Home({services}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Kossobe Home</title>
        <meta name="description" content="Kossobe website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero/>
      <CategList data={services}/>
    </div>
  )
}

export async function getStaticProps() {

  //const aboutData = await client.fetch(`*[_type == "contenu"]`);
  const services = await client.fetch(`*[_type == "service"]`);
  return {
    props: {
     // aboutData,
      services
    },
    revalidate: 1,
  };
}
