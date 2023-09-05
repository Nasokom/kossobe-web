import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import ComplexText from '../Ui/ComplexText'
import Styles from '../../styles/Home/Intro.module.css'
import Image from 'next/image'
import { urlFor } from '../../Utils/sanityClient';

import { useIsomorphicLayoutEffect } from '../../Utils/isomorphicLayout';
import { useStateContext } from '../../context/StateContext';

const HomeIntro = ({banner, tl}) => {
    const main = useRef(null)

    const {appColors,userLang} =useStateContext()

useIsomorphicLayoutEffect(()=>{
    //useEffect(()=>{
        const txt1 = main.current.querySelector('.introText1')
        const words = txt1.querySelectorAll('span') 
        const imgs = main.current.querySelectorAll('.introImgBoxs');
        const imgsNode = main.current.querySelectorAll('img');
        const imgContainer = main.current.querySelector('.introImgContainer');

        function imgAppear(d){
          imgsNode.forEach((img,i)=>{
            img.style.transform = `translateY(${d}%)`
          })
        }
        
         /*  tl.from(txt1,{
            translate :'-50% 100%'
          },) */

          tl.to(main.current,{
            opacity:1,
            onComplete:()=>imgAppear(-100),
            onReverseComplete:()=>imgAppear(100),
          })


          tl.to(txt1,{
            translate :'-50% -50%',
          })

          tl.addLabel('test', '+=1')



          tl.to(imgContainer,{
            y:'-100px',
            duration:10,
          },'test')

          words.forEach((word,i )=> {
            tl.to(word,{
                color: appColors && appColors[3].color.hex,
                duration:1
            },`test+=${i*0.1}`)
          });

         /*  tl.to(txt1,{
            backgroundColor:'black',
            duration:10,
          }) */

          tl.addLabel('end', '+=1')
          words.forEach((word,i )=> {
            tl.to(word,{
                x:5,
                y:20,
                opacity:0
            },`end+=${i*0.1}`)
          });

          tl.to(txt1,{
          //  translate:'-50% -70%',
            duration:10,
            opacity:0,
            onComplete:()=>imgAppear(-200),
            onReverseComplete:()=>imgAppear(-100),
          })
      },[tl])

  return (

    <div className={Styles.container} ref={main}>
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