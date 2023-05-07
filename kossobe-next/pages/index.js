import React,{useRef, useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Pages/Home.module.css'
import Hero from '../component/content/Hero'
import { client } from '../Utils/sanityClient'
import CategList from '../component/content/CategList'
import { useIsomorphicLayoutEffect } from '../Utils/isomorphicLayout'
import { gsap } from 'gsap'
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import FooterBanner from '../component/old/FooterBanner'
import OldHomeHeader from '../component/old/OldHomeHeader'


export default function Home({services, bannerData}) {

  console.log(bannerData[1])
  console.log(bannerData[0])
  const [imgW, setImgW] = useState(1500);

  return (
    <div className={styles.container}>
      <Head>
        <title>Kossobe Home</title>
        <meta name="description" content="Kossobe website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OldHomeHeader banner={bannerData[1]}/>
      <CategList data={services}/>
      <FooterBanner banner={bannerData[0]}/>
    </div>
  )
}

export async function getStaticProps() {

  //const aboutData = await client.fetch(`*[_type == "contenu"]`);
  const services = await client.fetch(`*[_type == "service"]`);
  const bannerData = await client.fetch(`*[_type == "banner"]`)
  return {
    props: {
     // aboutData,
      services,
      bannerData
    },
    revalidate: 1,
  };
}
