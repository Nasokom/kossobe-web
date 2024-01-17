import React, {useEffect,useLayoutEffect,useRef, useState} from 'react'
import ComplexText from '../../Ui/ComplexText'
import { useStateContext } from '../../../context/StateContext'
import Link from 'next/link';
import Styles from './CategList.module.css'
import Image from 'next/image';
import { urlFor } from '../../../Utils/sanityClient';
import {FaArrowRight, FaMusic} from 'react-icons/fa'
import { gsap } from 'gsap';
import SplitText from '../../../Utils/SplitText';
import { useIsomorphicLayoutEffect } from '../../../Utils/isomorphicLayout';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import service from '../../../../kossobe-sanity/schemas/service';

gsap.registerPlugin(ScrollTrigger);

const CategList = ({data, cible}) => {


  const title = {'fr': 'Découvrez nos services', 'de':'Entdecken Sie unsere Leistungen','en':'Discover our services'}

  const {userLang,router} = useStateContext();

  const main = useRef(null)
  const box = useRef(null)
  const [activeCard,setActiveCard]= useState(0);
  const [setFa,focusedCateg] = useState(null)

  const [gTl,setGtl] = useState(null)

useIsomorphicLayoutEffect(() => { 

  const ctx = gsap.context((self) => {
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: main.current,
        start:"top top",
        end: "+=2200vh",
        scrub: true,
        pin: true,
         onUpdate: self => {
          //le.log("progress:", self.progress.toFixed(2), "direction:", self.direction, "velocity", self.getVelocity());
          /* setFa(t< 0.2 ? 0 : t > 0.22 && t < 0.62 ? 1 : 2) */
        }
      }
    });

    setGtl(tl)
    
    const cards = self.selector('.categCard');
    const navBtns = self.selector('.categNavBtn')

    cards.forEach((card,i)=>{

      i > 0 &&
       tl.to(card,{
        translate:`0 ${(5*i)-0}vh`,
        duration:1,
        onStart:()=>setActiveCard(i),
        onReverseComplete: ()=>setActiveCard(i-1 ),
      })//0

      tl.to(card,{
        scale : `${ i < 2 ? `0.${8+i}` : 1}`,
        translate:`0 ${(5.5*i)-7}vh`,
        onComplete:()=>setActiveCard(i),
       
      })//0
    })

    // ClickeEvent 
    
    const categBox = main.current.parentElement
    const boxStart = box.current.offsetTop
    const boxHeight = main.current.offsetHeight

    gsap.utils.toArray("#categListNav button").forEach((a, i) => {
      a.addEventListener("click", e => {
        e.preventDefault();

        window.scrollTo({
          top: i == 0 ? boxStart
              :i == 1 ? (boxStart + boxHeight)
              :(boxStart + (boxHeight*2)),
          left: 0,
          behavior: "smooth",
        });
       // tl.seek(i+1)
      })
    })

    gsap.utils.toArray(".trickCardPos").forEach((a, i) => {
      a.addEventListener("click", e => {
        e.preventDefault();

        window.scrollTo({
          top: i == 0 ? boxStart
              :i == 1 ? (boxStart + boxHeight)
              :(boxStart + (boxHeight*2)),
          left: 0,
          behavior: "smooth",
        });
       // tl.seek(i+1)
      })
      
    })
  
}, main);
return () => ctx.revert();
}, []);


  return (
    <div ref={box}>
    <div className={Styles.parent} id="categList" ref={main}>
      <h2>{title[userLang]}</h2>

      <div className={Styles.nav} id='categListNav'>
        {data.sort(function(a,b){return a.ordre-b.ordre}).map((d,i)=>{
          return( <button
          key={i}
                      data-clr={d.color.hex} data-txtClr={'black'}
                        // onClick={()=>gTl.seek(i+0.5*i,true)}
                        //onClick={()=>alert(window.scrollY)}
                      style={{border:`2px solid ${d.color.hex}`,
                              backgroundColor: activeCard == i? d.color.hex : 'inherit' ,
                              color: activeCard == i ? 'black' : 'var(--textColor)' ,
                              scale: activeCard == i ? '1.1 1.1' : 'inherit'
                            }}
                      className='categNavBtn'>
                        {d.name[userLang]}
                  </button> ) 
        })}
      </div>

      <div className={Styles.container}>

          {data.sort(function(a,b){return a.ordre-b.ordre}).map((d,i)=>{

            const myLoader = () => {
                return d.image && urlFor(d.image).url()
            }

            /* Button Router + anim function */

            const card = useRef(null)


              
            function routingAnim(e){
              

              if(e.target.className.includes("trick")){
                return
              }
              card.current.classList.add('cardRouterHome')
              document.documentElement.style.overflow ="hidden"
              setTimeout(()=>{
                router.push(`/services/${d.slug.current}`)
              },300)

            }


            return(
              <div onClick={(e)=>routingAnim(e)}
              className={`categCard ${Styles.card}`} style={{backgroundColor: d.color.hex ? d.color.hex : 'blue', color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}} ref={card}>
              
              <div className={`${Styles.invisibleTrick} trickCardPos`}></div>


              {/* left Img */}
                <div className={Styles.cardLeft} 
                      onClick={(e)=>routingAnim(e)}
                      style={{backgroundColor: d.color.hex ? d.color.hex : 'blue', color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}}>
                  <div className={Styles.imgBox}>
                  <Image 
                    loader={myLoader}
                    objectFit="cover"
                    fill
                    sizes="100%"
                    src={'bjr'}
                    alt=''
                    />
                </div>
                </div>

                {/* right  Txt*/}

                <div className={Styles.cardRight} onClick={(e)=>routingAnim(e)}>
                  
                <h3 style={{color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}}>{d.name[userLang]}</h3>

                  <ul className={Styles.services}>
                    {d.services && d.services.map((service,i)=>{
                      return(
                        <li key={i} style={{color:'black'}}>
                          <div style={{display: i == 0 && 'none' /* color: d.colorTxt.hex  */}}><FaMusic/></div>
                          {service.name[userLang].replace(/"([^"]+)"|\(([^)]+)\)/g, '')}
                          </li>
                      )
                    })}
                  </ul>

                  <p className={Styles.shortDesc}style={{color: d.colorTxt.hex }}> 
                  {
                    d.shortDesc && d.shortDesc[userLang] ? <ComplexText data={d.shortDesc[userLang]}/> :
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tenetur cupiditate ea earum nemo minima unde, laboriosam molestiae facere ipsa a aut iste iusto voluptates officia beatae tempora atque vitae.'
                  }
                  </p>


                  <div className={Styles.discover}>
                      <p>Discover</p>
                      <div onClick={(e)=>routingAnim(e)} href={`/services/${d.slug.current}`} key={i} className={Styles.linkBox}>
                        <button style={{outline:`9px solid ${ d.color.hex ? d.color.hex : 'blue'}`}}> <FaArrowRight/> </button>

                        <svg  className={Styles.svg}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z"></path>
                        <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z"></path>
                        </svg>

                        <svg  className={Styles.svg2}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" ></path>
                        <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" ></path>
                        </svg>
                      </div>

                    </div>
                </div>
                
              </div>
              )
            })}

        </div>
    </div>
    </div>
  )
}

export default CategList
