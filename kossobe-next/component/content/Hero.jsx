import React ,{useEffect, useState, useRef} from 'react'
import Image from 'next/image'
import styles from '../../styles/module/Hero.module.css'
import { gsap } from 'gsap';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '../../Utils/isomorphicLayout';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

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
     
                 tl.to(crowd3,{
                   y:600
                 },0)   
                 tl.to(crowd2,{
                    y:700
                  },0)  
                  tl.to(crowd1,{
                    y:700
                  },0)
                  tl.to(stage,{
                    y:400
                  },0)  
                  tl.to(title,{
                    y:'-50vh',
                  },0)  

             }, main);
             return () => ctx.revert();
           }, []);
     

  return (
    <div className={styles.hero} ref={main}>
        <div className={styles.parallax_wrapper}>
            <h1 className={styles.title} id='title'>Kossobe</h1>
            <Image src="/img/stage.png" height={500} width={500} className={styles.stage} id={'stage'}/>
            <Image src="/img/crowd3.png" height={imgW*0.4} width={imgW} className={styles.crowd3} id="crowd3"/>
            <Image src="/img/crowd2.png" height={imgW*0.4} width={imgW} className={styles.crowd2} id="crowd2"/>
            <Image src="/img/crowd1.png" height={imgW*0.4} width={imgW} className={styles.crowd1} id="crowd1"/>
        </div>
    </div>
  )
}

export default Hero