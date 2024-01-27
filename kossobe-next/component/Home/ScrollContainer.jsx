import React,{useRef, useState} from 'react'
import Image from 'next/image'
import CategList from './CategList'
import { useIsomorphicLayoutEffect } from '../../Utils/isomorphicLayout'
import { gsap } from 'gsap'
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import FooterBanner from '../Ui/FooterBanner'
import HeroBanner from './HeroBanner'
import ScrollDown from '../Ui/ScrollDown'
import HomeIntro from './HomeIntro'


gsap.registerPlugin(ScrollTrigger);

export default function ScrollContainer({services, bannerData, appColors, userLang}) {
  const [tl,setTl] = useState(null)
  const main = useRef(null)
  const timeline = useRef()
  const [arrowElt, setArrowElt]= useState(null)

  useIsomorphicLayoutEffect(() => { 

    const ctx = gsap.context((self) => {

        const img = main.current.querySelector('.hero-img')
        const h2 = main.current.querySelectorAll('h2')
        const textBox = main.current.querySelector('.heroText')
      
      timeline.current = gsap.timeline({
        scrollTrigger: {
          trigger: main.current,
          start:"top top",
          end: "+=5000vh",
          scrub: true,
          pin: true,
        }
      });

 /*      timeline.current.to(img,{
        scale:'1',
        translate:'0 -80%',
        opacity:1,
        duration:20,
        borderRadius:'0px',
        onComplete: ()=>setTexAnim({h1:'outUp',h3:'outDown'}),
        onReverseComplete: ()=>setTexAnim({h1:'inUp',h3:'inDown'})
      })

      timeline.current.to(h2,{
        delay:2,
        opacity:1,
        color:'white',
        display:'flex'
      })

      timeline.current.addLabel('transition1', '+=1')


      timeline.current.to(img,{
        opacity:0,
        duration:10,
        onComplete: ()=>setTexAnim({h1:'outUp',h3:'outDown',h2:'outUp'}),
        onReverseComplete: ()=>setTexAnim({h2:'inDown'})
      },'transition')
      const arrow = main.current.querySelector('.scrollDownArrow')

      timeline.current.from(arrow,{
        translate: '-50% 0'
      })
      timeline.current.to(arrow,{
        scale:0.5,
        x:'200%',
        y:'50%',
        rotate:"360deg"
      }) */
      setTl(timeline)

      

  }, main);

  return () => ctx.revert();
  }, []);
  

  return (
    <>
      <div ref={main} style={{backgroundColor:appColors[3].color.hex}}>
       <ScrollDown/>
       <HeroBanner banner={bannerData[1]} tl={timeline.current} main={main} userLang={userLang} arrow={arrowElt}/>
     {/*   <HomeIntro banner={bannerData[1]} tl={timeline.current} userLang={userLang}/> */}
       {/*  <CategList data={services} cible={bannerData[1].intro} tl={timeline.current} arrow={arrowElt}/> */}
      </div>
      <FooterBanner banner={bannerData[0]}/>
    </>
  )
}

