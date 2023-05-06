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

gsap.registerPlugin(ScrollTrigger)

export default function Home({services}) {

  const [imgW, setImgW] = useState(1500);

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
    <div className={styles.container} ref={main}>
      <Head>
        <title>Kossobe Home</title>
        <meta name="description" content="Kossobe website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero id="hero"/>
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
