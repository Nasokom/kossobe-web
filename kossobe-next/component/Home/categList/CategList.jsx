import React, {useEffect,useLayoutEffect,useRef, useState} from 'react'
import ComplexTexts from '../../Ui/ComplexText'
import { useStateContext } from '../../../context/StateContext'
import Link from 'next/link';
import Styles from './CategList.module.css'
import Image from 'next/image';
import { urlFor } from '../../../Utils/sanityClient';
import {FaArrowRight} from 'react-icons/fa'
import { gsap } from 'gsap';
import SplitText from '../../../Utils/SplitText';
import { useIsomorphicLayoutEffect } from '../../../Utils/isomorphicLayout';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';


const CategList = ({data, cible, tl,arrow, router, appColors, userLang}) => {


  const main = useRef(null)

  const [setFa,focusedCateg] = useState(null)

  const [textAnim,setTextAnim] = useState({
    h1:'inUp',
    h3:'inDown',
    h2:'inDown'
  }) 

  useLayoutEffect(()=>{
//useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);

    const cards = main.current.querySelectorAll('.categCard');
    const navBtns = main.current.querySelectorAll('.categNavBtn')
    const nav = main.current.querySelector('#categListNav')
    const cardContainer = main.current.querySelector('#categCardContainer')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: main.current,
        start:"top top",
        end: "+=1000vh",
        scrub: true,
        pin:true

      }
    });
    //0.22 //0.62

      tl.to(main.current,{
        translate:'0 0',
        
        onReverseComplete: ()=>setTextAnim({h1:'outUp'})
      })

      tl.to(cardContainer,{
        opacity:1
      })

      tl.to(nav,{
        opacity:1
      })

      tl.addLabel('card0', "+=1")
      tl.addLabel('card1', "+=15")
      tl.addLabel('card2', "+=30")


        navBtns.forEach((btn,i)=>{
       /*    tl.to(btn,{
            backgroundColor:btn.dataset.clr,
            color:'black',
          },`card${i}`) */

          i !== 2 && tl.to(btn,{
            backgroundColor:'white',
            //color:btn.dataset.clr
            color:'black',
          },`card${i+1}`)
        })

        cards.forEach((card,i)=>{

          tl.to(card,{
             translate:`0 0`,
             //translate:`0 400px`,
            //y:`${(5*i)-0}dvh`,
            duration:5
          },`card${i}`)//0 

           tl.to(card,{
            scale : `${ i < 2 ? `0.${8+i}` : 1}`,
            translate:`0 ${(5.5*i)-7}vh`,
            //y:`${(5.5*i)-7}vh`,
            duration:5
          },`card${i}+=5`)//0
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
            tl.seek(`card${i}`);
          })
        }) 




  },[])

const titre ={fr:'Decouvrez nos services', de:'Entdecken Sie unsere Leistungen', en:'Discover our services'}



  return (
    <div ref={main}>
    <div className={Styles.parent} id="categList" >
      <h2><SplitText data={titre[userLang]} direction={textAnim.h1}/></h2>
      <div className={Styles.nav} id='categListNav'>
        
        {data.sort(function(a,b){return a.ordre-b.ordre}).map((d,i)=>{
          return <button data-clr={appColors && appColors[i].color.hex} key={i}
          // onClick={()=>gTl.seek(i+0.5*i,true)}
          //onClick={()=>alert(window.scrollY)}
             //style={{border:`2px solid ${d.color.hex}`,backgroundColor:'white', color: 'black`' }} className='categNavBtn'>{d.name[userLang]}</button>  
             style={{border:`2px solid ${ appColors && appColors[i].color.hex}`,backgroundColor:'white', color: 'black`' }} className='categNavBtn'>{d.name[userLang]}</button>  
        })}
      </div>

      <div className={Styles.container} id='categCardContainer'>

          {data.sort(function(a,b){return a.ordre-b.ordre}).map((d,i)=>{

            const myLoader = () => d.image && urlFor(d.image).url()

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
              <div onClick={(e)=>routingAnim(e)} key={i}
              className={`categCard ${Styles.card}`}
               //style={{backgroundColor: d.color.hex ? d.color.hex : 'blue', color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}}  
               style={{backgroundColor: appColors && appColors[i].color.hex, color: appColors && appColors[i].txtColor.hex}} 
        
               ref={card}>
              
              {/* left Img */}
                <div className={Styles.cardLeft} 
               // style={{backgroundColor: d.color.hex ? d.color.hex : 'blue', color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}}
               style={{backgroundColor: appColors && appColors[i].color.hex, color: appColors && appColors[i].txtColor.hex}} 
                >
                  <div className={Styles.imgBox}>
                  <Image 
                    loader={myLoader}
                    style={{objectFit:"cover"}}
                    fill
                    sizes="100%"
                    src={'f'}
                    alt='yes'
                    />
                </div>
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

                  <h3 //style={{color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}}
                    style={{backgroundColor: appColors && appColors[i].color.hex, color: appColors && appColors[i].txtColor.hex}} 
                  >{d.name[userLang]}</h3>

                  <div className={Styles.discover}>
                      <p>Discover</p>
                      <div onClick={(e)=>routingAnim(e)} href={`/services/${d.slug.current}`} key={i} className={Styles.linkBox}>
                        <button 
                        //style={{outline:`9px solid ${ d.color.hex ? d.color.hex : 'blue'}`}}
                        style={{outline:`9px solid ${appColors && appColors[i].color.hex}`}}
                        > <FaArrowRight/> </button>

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
    </div>
  )
}

export default CategList

