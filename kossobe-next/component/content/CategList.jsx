import React, {useEffect,useRef} from 'react'
import ComplexTexts from '../Ui/ComplexText'
import { useStateContext } from '../../context/StateContext'
import Link from 'next/link';
import Styles from '../../styles/module/CategList.module.css'
import Image from 'next/image';
import { urlFor } from '../../Utils/sanityClient';
import {FaArrowRight} from 'react-icons/fa'
import { gsap } from 'gsap';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '../../Utils/isomorphicLayout';


gsap.registerPlugin(ScrollTrigger);

const CategList = ({data, cible}) => {

  const {userLang,router} = useStateContext();

  const main = useRef(null)

useIsomorphicLayoutEffect(() => { 

  const ctx = gsap.context((self) => {

    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: main.current,
        start:"top top",
        end: "+=3000vh",
        scrub: true,
        pin: true,
        //markers:true
      }
    });
    
    const cards = self.selector('.categCard');


    //Image anim
    cards.forEach((card,i)=>{
      i > 0 && tl.to(card,{
        translate:`0 ${(5*i)-0}vh`,
      })//0
      tl.to(card,{
        scale : `${ i < 2 ? `0.${8+i}` : 1}`,
        translate:`0 ${(1.5*i)-7}vh`,
      })//0
    })
  
}, main);
return () => ctx.revert();
}, []);

 
  
  return (
    <div className={Styles.parent} id="categList" ref={main}>
      <p style={{paddingBottom:"30px"}}>{cible[userLang]}</p>
      <h2>Decouvrez nos services</h2>

      <div className={Styles.nav}>
        {data.sort(function(a,b){return a.ordre-b.ordre}).map((d,i)=>{
          return <button>{d.name[userLang]}</button>  
        })}
      </div>

      <div className={Styles.container}>

          {data.sort(function(a,b){return a.ordre-b.ordre}).map((d,i)=>{

            const myLoader = () => {
                return d.image && urlFor(d.image).width(200).height(200).url()
            }

            /* Button Router + anim function */

            const card = useRef(null)

            function routingAnim(e){
              card.current.classList.add('cardRouterHome')
              document.documentElement.style.overflow ="hidden"
              setTimeout(()=>{
                router.push(`/services/${d.slug.current}`)
              },300)
              console.log(e)
            }


            return(
              <div className={`categCard ${Styles.card}`} style={{backgroundColor: d.color.hex ? d.color.hex : 'blue', color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}} ref={card}>
              
              {/* left Img */}
                <div className={Styles.cardLeft}>
                  <Image 
                    loader={myLoader}
                    objectFit="cover"
                    fill
                    sizes="100%"
                    src={'bjr'}
                    alt=''
                    />
                </div>

                {/* right  Txt*/}

                <div className={Styles.cardRight}>
                  
                  <ul className={Styles.services}>
                    {d.services && d.services.map((service,i)=>{
                      return(
                        <li key={i} style={{color:'black'}}>{service.name[userLang]}</li>
                      )
                    })}
                  </ul>

                  <h3 style={{color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}}>{d.name[userLang]}</h3>

                  <div className={Styles.discover}>
                      <p>Discover</p>
                      <div onClick={(e)=>routingAnim(e)} href={`/services/${d.slug.current}`} key={i} className={Styles.linkBox}>
                        <button style={{outline:`9px solid ${ d.color.hex ? d.color.hex : 'blue'}`}}> <FaArrowRight/> </button>
                      </div>

                    </div>
                </div>
                
              </div>
              )
            })}

        </div>
    </div>
  )
}

export default CategList

