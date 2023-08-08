import React,{useRef, useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { client } from '../Utils/sanityClient'
import CategList from '../component/content/CategList'
import { useIsomorphicLayoutEffect } from '../Utils/isomorphicLayout'
import { gsap } from 'gsap'
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import FooterBanner from '../component/Ui/FooterBanner'
import HeroBanner from '../component/content/HeroBanner'


export default function Home({services, bannerData}) {

  const [imgW, setImgW] = useState(1500);

  return (
    <>
      <Head>
        <title>Kossobe Home</title>
        <meta name="description" content="Kossobe website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroBanner banner={bannerData[1]}/>
      <CategList data={services} cible={bannerData[1].intro}/>
      <FooterBanner banner={bannerData[0]}/>
    </>
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
