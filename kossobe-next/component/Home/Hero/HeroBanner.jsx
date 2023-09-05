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
            end:'+=1000',
            pin:true,
            scrub: true,
            behavior:'smooth'
          }
        });

        const img = main.current.querySelector('.hero-img')
        const h2 = main.current.querySelector('.hero-h2')

        tl.to(img,{
          scale:'1',
          opacity:1,
          duration:20,
          onComplete: ()=>setTexAnim({h1:'outUp',h3:'outDown'}),
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
          duration:10,
          onComplete: ()=>setTexAnim({h1:'outUp',h3:'outDown',h2:'outUp'}),
          onReverseComplete: ()=>setTexAnim({h2:'inDown'})
        },'transition')

    

        tl.from(arrow,{
          translate: '-50% 0'
        })
        tl.to(arrow,{
          scale:0.5,
          x:'200%',
          y:'50%',
          rotate:"360deg"
        })
  
  
    }, main);
  
    return () => ctx.revert();
    }, []);

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
        </div>

    )
}

export default HeroBanner
