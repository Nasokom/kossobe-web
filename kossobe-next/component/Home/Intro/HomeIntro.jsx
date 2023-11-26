import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import ComplexText from '../../Ui/ComplexText'
import Styles from './Intro.module.css'
import Image from 'next/image'
import { urlFor } from '../../../Utils/sanityClient';
import { gsap } from 'gsap'
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '../../../Utils/isomorphicLayout';
import { useStateContext } from '../../../context/StateContext';

gsap.registerPlugin(ScrollTrigger);

const HomeIntro = ({banner, tl, userLang, appColors}) => {

    const main = useRef(null)

    useIsomorphicLayoutEffect(() => { 


      const ctx = gsap.context((self) => {
        

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: main.current,
            start:"top top",
            end: "+=1000vh",
            scrub: true,
            pin:true,
          }
        });

        const txt1 = main.current.querySelector('.introText1')

      

        const words = gsap.utils.toArray('span');
        const imgsNode = main.current.querySelectorAll('.intro-imgs');
        const imgContainer = main.current.querySelector('.introImgContainer');

        function imgAppear(d){
          imgsNode.forEach((img,i)=>{
            img.style.transform = `translateY(${d}%)`
          })
        }
        
          tl.to(main.current,{
            opacity:1,
            onComplete:()=>imgAppear(-100),
            onReverseComplete:()=>imgAppear(100),
          })


          tl.addLabel('test', '+=1')


          tl.to(imgContainer,{
            y:'-150px',
            duration:10,
          },'test')

          words.forEach((word,i )=> {
            tl.to(word,{
                //color: appColors && appColors[3].color.hex,
                color:'black',
                translate:'0 5px',
                duration:1,
                onStart: ()=>console.log('word'+i)
            },`test+=${i*0.1}`)
          });

          tl.addLabel('endo', '+=1')

          words.forEach((word,i )=> {
            tl.to(word,{
                x:5,
                y:20,
                opacity:0
            },`endo+=${i*0.1}`)
          });
          
          tl.to(txt1,{
          //  translate:'-50% -70%',
            duration:10,
            opacity:0,
            onComplete:()=>imgAppear(-200),
            onReverseComplete:()=>imgAppear(-100),
          })

  
  
    }, main);
  
    return () => ctx.revert();
    }, [appColors]);


  return (

    <div className={Styles.container} id={"#intro-main"}ref={main}>
           <div className={`introText1 ${Styles.textBox}`}>
                <ComplexText data={banner.text[userLang]}/>
            </div>       

            <div className={`introImgContainer ${Styles.imgContainer}`}>

            {banner.images.map((img,i)=>{

              const myLoader = () => img && urlFor(img)

              return(

              <div className={`introImgBoxs ${Styles.imgBox}`} key={i}>
                <Image
                  src={"fake"}
                  loader={myLoader}
                  sizes={'100%'}
                  fill
                  style={{objectFit:"cover"}}
                  className='intro-imgs'
                  alt="yes"
                />
              </div>

              )

            })}
            </div>    
    </div>
  )
}

export default HomeIntro