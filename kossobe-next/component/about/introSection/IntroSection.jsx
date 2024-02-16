import React,{useRef,useState} from 'react'
import { gsap, selector } from 'gsap';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '../../../Utils/isomorphicLayout';
import styles from './introSection.module.css'
import Image from 'next/image'
import { urlFor } from '../../../Utils/sanityClient';
gsap.registerPlugin(ScrollTrigger);

const IntroSection = ({appColors, datas, userLang}) => {

const main = useRef(null)


useIsomorphicLayoutEffect(() => { 
  const ctx = gsap.context((self) => { 
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: main.current,
        start:"top top",
        end: "+=5000vh",
        scrub: true,
        pin: true,
        //markers:true
      }
    });

    
    const cards = self.selector('.introCard');

    //Image anim
    cards.forEach((card,i)=>{

      const textContainer = card.querySelector('.introTextContainer')
      const img = card.querySelector('.introImg')
      const textEnligth = card.querySelector('.introTxt')
      const spans = textEnligth.querySelectorAll('span');

      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

       i !== 0 && tl.to(card,{
        translate:`0 0`,
      })

      cards[i-1] && tl.to(cards[i-1],{
        opacity:0,
        duration:0,
      })
      
      spans.forEach((span,i)=>{
        tl.to(span,{
          opacity:1,
          duration:0.02,
        })
      })

      tl.to(textContainer,{
      opacity:1,
      })

      tl.addLabel("myLabel", ">");

      spans.forEach((span,i)=>{
        tl.to(span,{
          translate:`${getRndInteger(-100,100)}vh ${getRndInteger(-100,100)}vh`,
          opacity:0,
        },'myLabel')
      })


      tl.to(textContainer,{
        opacity:0,
      },'myLabel')

      tl.to(img,{
        scale:'1',
        borderRadius: "0px"
      }, 'myLabel')
     
    })

    const keyCards = self.selector('.complex-text')

  
}, main);
return () => ctx.revert();
}, []);

  return (
    <div ref={main} className={styles.pinSpacer} id="aboutAnimContainer">

     <div className={styles.introContainer}>
      {datas.map((data,i)=>{

        const txt = data.text[userLang].split(' ')

        const imgLoader = () =>{return data.image && urlFor(data.image).url()}
        return(
          <div key={i} className={` ${styles.card} introCard` }>

              <div className={`introImg ${styles.imgBox}`}> 
                <Image loader={imgLoader} fill  style={{objectFit:'cover'}}sizes={'100%'}src={'bjr'}alt=''/>
              </div>

              <div className={`introTextContainer ${styles.textContainer}`}>

                  <div>
                    <p>
                      {txt.map((t,i)=> <span key={i}>{t}</span>)}
                    </p>
                  </div>

                  <div className='introTxt'>
                      <p>
                        {txt.map((t,i)=> <span key={i}>{t}</span>)}
                      </p>
                  </div>
              </div>
          </div>
        )
      })}

    </div>{/* end intro */}
    </div>

  )
}

export default IntroSection