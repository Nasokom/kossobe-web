
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



gsap.registerPlugin(ScrollTrigger)

export default function Home({services, bannerData}) {
  const {userLang,appColors,router} = useStateContext()
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

  const main = useRef(null)

  useIsomorphicLayoutEffect(() => {

      //setImgW(window.innerWidth)

      const ctx = gsap.context((self) => {
   
          main.current.querySelector('#crowd3').style.transform = `translateY(${imgW*0.3}px)`;
          main.current.querySelector('#crowd2').style.transform = `translateY(${imgW*0.4}px)`
          main.current.querySelector('#crowd1').style.transform = `translateY(${imgW*0.6}px)`

               const crowd3 = self.selector('#crowd3');
               const crowd2 = self.selector('#crowd2');
               const crowd1 = self.selector('#crowd1');
               const stage = self.selector('#stage');
               const title = self.selector('#title');

               const tl = gsap.timeline({
                 scrollTrigger: {
                   trigger: main.current,
                   start:"top top",
                   end: "+=1500px",
                   scrub: true,
                   pin: true,
                 }
               });
   
               tl.to(crowd3,{y:600},0)   
               tl.to(crowd2,{y:700},0)  
                tl.to(crowd1,{y:700},0)
                tl.to(stage,{y:400},0)  
                tl.to(title,{y:'-50vh',},0) 
                tl.to(crowd3,{x:1500, scale: 2},1)   
               tl.to(crowd2,{x:-1500, scale: 2},1)  
                tl.to(crowd1,{y:1500, scale: 2},1)
                tl.to(self.selector('#hero'),{
                  y:'-100vh',
                 },2)
               tl.to(self.selector('#categList'),{
                y:'-100vh',
               },2)

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
  return {
    props: {
     // aboutData,
      services
    },
    revalidate: 1,
  };
}