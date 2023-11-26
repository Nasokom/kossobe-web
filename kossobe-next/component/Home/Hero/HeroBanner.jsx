import React, {useEffect,useLayoutEffect,useRef, useState} from 'react'
import { urlFor } from '../../../Utils/sanityClient';
import Image from 'next/image';
import { useStateContext } from '../../../context/StateContext';
import ComplexText from '../../Ui/ComplexText';
import Styles from './Hero.module.css'
import DoubleText from '../../Ui/DoubleText';
import gsap from 'gsap';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import SplitText from '../../../Utils/SplitText';
import { useIsomorphicLayoutEffect } from '../../../Utils/isomorphicLayout';
import HomeIntro from '../Intro/HomeIntro';

const HeroBanner = ({banner,tl,userLang,arrow,appColors}) => {

  const [textAnim,setTexAnim] = useState({
    h1:'inUp',
    h3:'inDown',
    h2:'inDown'
  }) 

    const main = useRef(null)

    const myLoader = () => banner.image && urlFor(banner.image)

    useIsomorphicLayoutEffect(() => { 

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context((self) => {
  
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: main.current,
            start:"top top",
            end:'bottom top',
            scrub: true,
            pin:true,
            behavior:'smooth'
          }
        });

        const img = main.current.querySelector('.hero-img')
        const h2 = main.current.querySelector('.hero-h2')

        tl.to(img,{
          scale:1,
          y:"-80%",
          translateY:'0',
          duration:20,
          onComplete: ()=>setTexAnim({h1:'outUp',h3:'outUp'}),
          onReverseComplete: ()=>setTexAnim({h1:'inUp',h3:'inDown'})
        })

        tl.to(h2,{
          delay:2,
          opacity:1,
          color:'white',
          display:'flex'
        })

        tl.addLabel('transition1', '+=1')

        tl.to(img,{
          opacity:0,
          width:'110%',
          duration:10,
          onComplete: ()=>setTexAnim({h1:'outUp',h3:'outUp',h2:'outUp'}),
          onReverseComplete: ()=>setTexAnim({h2:'inDown'})
        },'transition')

       /*  tl.from(arrow,{
          translate: '-50% 0'
        })

        tl.to(arrow,{
          scale:0.5,
          x:'200%',
          y:'50%',
          rotate:"360deg"
        }) */
        const txt1 = main.current.querySelector('.introText1')

      

        //const words = gsap.utils.toArray('span');
        const imgsNode = main.current.querySelectorAll('.intro-imgs');
        const imgContainer = main.current.querySelector('.introImgContainer');
        const introMain = main.current.querySelector('#intro-main')

        function imgAppear(d){
          imgsNode.forEach((img,i)=>{
            img.style.transform = `translateY(${d}%)`
          })
        }
        
          tl.to(introMain,{
            opacity:1,
            onComplete:()=>imgAppear(-100),
            onReverseComplete:()=>imgAppear(100),
          },'transition')


          tl.addLabel('test', '+=1')


          tl.to(imgContainer,{
            y:'-150px',
            duration:10,
          },'test')

         /*  words.forEach((word,i )=> {
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
          }); */
          
          tl.to(txt1,{
          //  translate:'-50% -70%',
            duration:10,
            opacity:0,
            onComplete:()=>imgAppear(-200),
            onReverseComplete:()=>imgAppear(-100),
          })

  
    }, main);
  
    return () => ctx.revert();
    }, [appColors,userLang]);

    return (

        <div className={Styles.container} ref={main}>
            

            <div className={`heroText ${Styles.textBox}`} style={{textShadow:`0.3em 0.3em 0px ${appColors[3].txtColor.hex}`}}>
              <h1 className='hero-h1'><SplitText data={'KOSSOBE'} direction={textAnim.h1}/></h1>
              <h3 className='hero-h3'><SplitText data={banner.catchP[userLang]} direction={textAnim.h3}/></h3>
              <h2 className='hero-h2'><SplitText data={banner.catchP[userLang]} direction={textAnim.h2}/></h2>
            </div>
      
            {/* <p>{banner.intro[userLang]}</p> */}


            <div className={`hero-img ${Styles.imgBox}`}>
              <Image
                src={"fake"}
                loader={myLoader}
                sizes={'100%'}
                priority={true}
                fill
                //style={}

              />
            </div>
            {/* <HomeIntro userLang={userLang} banner={banner}/> */}

        </div>

    )
}

export default HeroBanner
