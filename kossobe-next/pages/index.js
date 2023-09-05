
import React,{useRef, useState,Suspense, useLayoutEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { client } from '../Utils/sanityClient'
import CategList from '../component/Home/CategList'
import { useIsomorphicLayoutEffect } from '../Utils/isomorphicLayout'
import { gsap } from 'gsap'
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import FooterBanner from '../component/Ui/FooterBanner'
import HeroBanner from '../component/Home/HeroBanner'
import ScrollDown from '../component/Ui/ScrollDown'
import HomeIntro from '../component/Home/HomeIntro'
import { useStateContext } from '../context/StateContext'
import Loading from '../component/Layout/Loading'


gsap.registerPlugin(ScrollTrigger);

export default function Home({services, bannerData}) {
  const {userLang,appColors,router} = useStateContext()
  const [tl,setTl] = useState(null)
  const main = useRef(null)
  const timeline = useRef()
  const [arrowElt, setArrowElt]= useState(null)

  useIsomorphicLayoutEffect(() => { 

    const ctx = gsap.context((self) => {
      

      timeline.current = gsap.timeline({
        scrollTrigger: {
          trigger: main.current,
          start:"top top",
          end: "+=5000vh",
          scrub: true,
          pin: true,
          behavior:'smooth'
        }
        
      });
      setTl(timeline)

      const arrow = main.current.querySelector('.scrollDownArrow')
      
      setArrowElt(arrow);

  }, main);

  return () => ctx.revert();
  }, []);
  


  return (
    <>
      <Head>
        <title>Kossobe Home</title>
        <meta name="description" content="Kossobe website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<Loading/>}>

      <div ref={main} style={{backgroundColor:appColors[3].color.hex}}>
       <ScrollDown/>
      {tl && <HeroBanner banner={bannerData[1]}  appColors={appColors} tl={timeline.current} main={main} userLang={userLang} arrow={arrowElt}/>}
      {tl && <HomeIntro banner={bannerData[1]} tl={timeline.current} userLang={userLang}/> }
      {tl && <CategList data={services} router={router} appColors={appColors} cible={bannerData[1].intro} tl={timeline.current} arrow={arrowElt} userLang={userLang} /> }
      </div>
      </Suspense>
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