import React, {useRef,useState} from 'react'
import { useStateContext } from '../context/StateContext'
import { client, urlFor } from '../Utils/sanityClient';
import Image from 'next/image'
import ComplexText from '../component/Ui/ComplexText';
import styles from '../styles/Pages/About.module.css'
import { gsap, selector } from 'gsap';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '../Utils/isomorphicLayout';
import {FaHeart} from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger);

const About = ({appColors, data}) => {

  const {userLang} = useStateContext();
  const main = useRef(null)

  const [valueIndex, setValueIndex] = useState(0)
  const [gTl,setGtl] = useState(null)

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

      setGtl(tl)
      
      const cards = self.selector('.introCard');
      const lastSection = main.current.querySelector('.lastSection')
  

  
      //Image anim
      cards.forEach((card,i)=>{

        const textContainer = card.querySelector('.introTextContainer')
        const img = card.querySelector('.introImg')
        const text1 = card.querySelector('.introTxt1')
        const text2 = card.querySelector('.introTxt2')
        const spans = text2.querySelectorAll('span');

         i !== 0 && tl.to(card,{
          translate:`0 0`,
          duration: 3
        })
        
        spans.forEach((span,i)=>{
          tl.to(span,{
            opacity:1,
            color:'black',
            duration:0.1,
          })
        })
        
        tl.to(textContainer,{
          translate:`0 -100vh`,
          duration: 7
        })//0

        tl.to(img,{
          scale:1,
          duration: 1
        })//0
      })



      tl.to(lastSection,{
        translate : '0 -100vh',
        duration: 5,
      })

      const keyCards = self.selector('.complex-text')


      keyCards.forEach((card,i)=>{

        tl.to(card,{
          duration: 2,
          color: appColors[i] ? appColors[i].colorTxt.hex : appColors[0].colorTxt.hex,
        })

      })

      /* OUR VALUES */
      const valueSection = main.current.querySelector('.value-section')

      tl.to(lastSection,{
        translate : '0 -200vh',
        duration: 10
      })


      const valueList = main.current.querySelector('.valueList').querySelectorAll('li')
      //const lis = valueList.querySelectorAll('li');

      const toggleClass = (elt,is) => is ? elt.classList.add('activeAboutLi') : elt.classList.remove('activeAboutLi')

      const valueTxtBox = main.current.querySelector('.valueTxtBox')

      const lastI = valueList.length -1
      valueList.forEach((li,i)=>{
        tl.to(valueTxtBox,{
          translate: `0px -${i*400}px`,
          backgroundColor: appColors[i] ? appColors[i].color.hex : appColors[0].color.hex,
          color: appColors[i] ?  appColors[i].colorTxt.hex :  appColors[0].colorTxt.hex,
          onStart : ()=>toggleClass(li,true),//!!SS+
          duration:0.1
        })

        tl.to(li,{
          color:appColors[i] ? appColors[i].colorTxt.hex : appColors[0].colorTxt.hex,
          fill:appColors[i] ? appColors[i].colorTxt.hex : appColors[0].colorTxt.hex,
          translate:'50px 0',
          duration:3,
        })

        tl.to(li,{
          duration: 3,
          //className:'+=activeAboutLi',
          onComplete: ()=>toggleClass(li,false), //!!SS+
          onReverseComplete : ()=>toggleClass(li,false),
        })

        tl.to(li,{
          color:'black',
          translate : '0px 0px',
          scale:1,
          duration:0.1,
          onReverseComplete : ()=>toggleClass(li,true),
        })

        i == lastI && tl.to(valueTxtBox,{
          translate: `0px -${(i+1)*400}px`,
          duration:3,
        })
      })

      
      //4052
      //4472
      //4871
      //5256

      valueList.forEach((a, i) => {
        a.addEventListener("click", e => {
          e.preventDefault();
          window.scrollTo({
            //top: i == 0 ? 6950 : i == 1 ? 8298 : 9150,
            top:4052 +400*i,
            left: 0,
            behavior: "smooth",
          });
          console.log(window.scrollY)
        })
      })

    
  }, main);
  return () => ctx.revert();
  }, []);


  //Split string 

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <h1>{userLang.includes('fr') ? 'Apprennez en plus sur nous' : userLang.includes('de') ? 'lerne mehr über uns' : 'Learn more about us'}</h1>
        <h2>{data.name[userLang]}</h2>
      </div>


      <div ref={main} className={styles.pinSpacer}>


          <div className={styles.introContainer}>
            {data.intro.map((data,i)=>{

              const txt = data.text[userLang].split(' ')

              const imgLoader = () =>{return data.image && urlFor(data.image).url()}
              return(
                <div key={i} className={` ${styles.card} introCard` }>

                    <div className={`introImg ${styles.imgBox}`}> 
                      <Image loader={imgLoader} fill  style={{objectFit:'cover'}}sizes={'100%'}src={'bjr'}alt=''/>
                    </div>

                    <div className={`introTextContainer ${styles.textContainer}`}>

                        <div className='introTxt1'>
                          <p>
                            {txt.map((t,i)=> <span key={i}>{t}</span>)}
                          </p>
                        </div>

                        <div className='introTxt2'>
                            <p>
                              {txt.map((t,i)=> <span key={i}>{t}</span>)}
                            </p>
                        </div>
                    </div>
                </div>
              )
            })}

          </div>{/* end intro */}

        <div className={`lastSection ${styles.lastSection}`}>
          <div className={`keyPoint-section ${styles.keyPointContainer}`}>
              {data.keyPoint.map((point,i)=>{
                return(
                  <div className={`keyCard ${styles.keyCard}`} key={i}>

                      <h3>{point.name[userLang]}</h3>
                        <div className={styles.keyText}>
                          <ComplexText data={point.text[userLang]}/>
                        </div>
                  </div>
                )
              })}
            </div>


            <div className={`value-section ${styles.valuesSection}`}>
                <h3>{data.values.title[userLang]}</h3>
                <div className={styles.valuesContainer}>
                    <ul className={`valueList ${styles.valuesList}`}>
                      {data.values.valeur.map((vName,i)=>{
                        return(
                          <li key={i}>
                             <FaHeart/> 
                             {vName.name[userLang]}</li>
                      )
                      })}
                    </ul>

                    <div className={`valuesImg ${styles.valuesImg}`}>
                      <div className={`valueTxtBox ${styles.valueTxtBox}`}>
                    {data.values.valeur.map((vName,i)=>{
                      return <ComplexText data={vName.text[userLang]} key={i}/>
                    })}
                    </div>

                     {/*   {valueIndex && <ComplexText data={data.values.valeur[valueIndex].text[userLang]}/>} */}
                    </div>

                </div>
              </div>

              </div>
      </div>
    </div>
  )
}

export default About

export async function getStaticProps(){

  const appColors = await client.fetch(`*[_type == "service"]{color,colorTxt}`);
  const data = await client.fetch(`*[_type == "about"][0]`);
  return {
    props: {
      appColors,
      data
      
    },
    revalidate: 1,
  };
}; 