import React, {useEffect,useRef, useState} from 'react'
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

  const [setFa,focusedCateg] = useState(null)

  const [gTl,setGtl] = useState(null)

useIsomorphicLayoutEffect(() => { 

  const ctx = gsap.context((self) => {
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: main.current,
        start:"top top",
        end: "+=3000vh",
        scrub: true,
        pin: true,
         onUpdate: self => {
          console.log("progress:", self.progress.toFixed(2), "direction:", self.direction, "velocity", self.getVelocity());
          /* setFa(t< 0.2 ? 0 : t > 0.22 && t < 0.62 ? 1 : 2) */
        }
      }
    });
    setGtl(tl)
    
    const cards = self.selector('.categCard');
    const navBtns = self.selector('.categNavBtn')

    //0.22 //0.62
    //Image anim

    navBtns.forEach((btn,i)=>{

      tl.to(btn,{
        backgroundColor:btn.dataset.clr,
        //color:btn.dataset.txtClr
        color:'black'
      },i)

      i !== 2 && tl.to(btn,{
        backgroundColor:'white',
        color:btn.dataset.clr
      },i+0.5)
    })

    cards.forEach((card,i)=>{

      i == 0 && tl.to(card,{
        opacity:1,
      },i)//0

      i > 0 && tl.to(card,{
        translate:`0 ${(5*i)-0}vh`,
      },i)//0

      tl.to(card,{
        scale : `${ i < 2 ? `0.${8+i}` : 1}`,
        translate:`0 ${(4.5*i)-7}vh`
      },i+0.5)//0
    })

    // ClickeEvent 

    
    gsap.utils.toArray("#categListNav button").forEach((a, i) => {
      a.addEventListener("click", e => {
        e.preventDefault();
        window.scrollTo({
          top: i == 0 ? 919 : i == 1 ? 2344 : 3870,
          left: 0,
          behavior: "smooth",
        });
      })
    })

    //919
    //2344
    //3870, 
  
}, main);
return () => ctx.revert();
}, []);


  return (
    <div className={Styles.parent} id="categList" ref={main}>
      <p style={{paddingBottom:"30px"}}>{cible[userLang]}</p>
      <h2>Decouvrez nos services</h2>

      <div className={Styles.nav} id='categListNav'>
        {data.sort(function(a,b){return a.ordre-b.ordre}).map((d,i)=>{
          return <button data-clr={d.color.hex} data-txtClr={d.colorTxt.hex}
          // onClick={()=>gTl.seek(i+0.5*i,true)}
          //onClick={()=>alert(window.scrollY)}
             style={{border:`2px solid ${d.color.hex}`,backgroundColor: i == 0 ? d.color.hex : 'white', color: i == 0 ? 'black' : d.color.hex}} className='categNavBtn'>{d.name[userLang]}</button>  
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
                        <li key={i} style={{color:'black'}}>{service.name[userLang].replace(/"([^"]+)"|\(([^)]+)\)/g, '')}</li>
                      )
                    })}
                  </ul>

                  <h3 style={{color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}}>{d.name[userLang]}</h3>

                  <div className={Styles.discover}>
                      <p>Discover</p>
                      <div onClick={(e)=>routingAnim(e)} href={`/services/${d.slug.current}`} key={i} className={Styles.linkBox}>
                        <button style={{outline:`9px solid ${ d.color.hex ? d.color.hex : 'blue'}`}}> <FaArrowRight/> </button>

                        <svg  className={Styles.svg}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#F9F8F6"></path>
                        <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#ffffff"></path>
                        </svg>

                        <svg  className={Styles.svg2}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#F9F8F6"></path>
                        <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#ffffff"></path>
                        </svg>
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

