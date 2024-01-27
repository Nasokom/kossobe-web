
import React,{useRef, useState,Suspense, useLayoutEffect, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { client } from '../Utils/sanityClient'
import CategList from '../component/Home/categList/CategList'
import { useIsomorphicLayoutEffect } from '../Utils/isomorphicLayout'
import { gsap } from 'gsap'
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import FooterBanner from '../component/Ui/FooterBanner'
import HeroBanner from '../component/Home/Hero/HeroBanner'
import ScrollDown from '../component/Ui/ScrollDown'
import HomeIntro from '../component/Home/Intro/HomeIntro'
import { useStateContext } from '../context/StateContext'
import Loading from '../component/Layout/Loading'




export default function Home({services, bannerData}) {
  const {userLang,appColors,router} = useStateContext()
  const main = useRef(null)
  const [arrowElt, setArrowElt]= useState(null)


  useEffect(()=>{
    
    setArrowElt(main.current.querySelector('.scrollDownArrow'))
    document.addEventListener("DOMContentLoaded", function (event) {
      var scrollpos = sessionStorage.getItem('scrollpos');
      if (scrollpos) {
        console.log(scrollpos)
          window.scrollTo(0, scrollpos);
          sessionStorage.removeItem('scrollpos');
      }
  });

    return(
    window.addEventListener("beforeunload", function (e) {
        sessionStorage.setItem('scrollpos', window.scrollY);
    })
    )
  },[])
  
  //backgroundColor:appColors[3].color.hex, 

  return (
    <>
      <Head>
        <title>Kossobe Home</title>
        <meta name="description" content="Kossobe website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<Loading/>}>

      <div ref={main} style={{position:'relative',backgroundColor:'var(--bgColor)'}}>
       <ScrollDown/>

       <HeroBanner banner={bannerData[1]}  appColors={appColors} main={main} userLang={userLang} arrow={arrowElt}/>

     {bannerData && <HomeIntro banner={bannerData[1]} userLang={userLang}/> }

       {services && <CategList data={services} router={router} appColors={appColors} cible={bannerData[1].intro} arrow={arrowElt} userLang={userLang} />}
      
      </div>
      </Suspense>
      {/* <FooterBanner banner={bannerData[0]}/> */}
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