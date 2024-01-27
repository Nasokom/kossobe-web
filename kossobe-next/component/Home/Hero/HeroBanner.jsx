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

    const myLoader = () => banner.image && urlFor(banner.image);
  

    return (

        <div className={Styles.container} ref={main}>
            

            <div className={`heroText ${Styles.textBox}`} style={{textShadow:`0.3em 0.3em 2px ${ 'white'/* appColors[3].txtColor.hex */}`}}>
              <h1 className='hero-h1'><SplitText data={'KOSSOBE'} direction={textAnim.h1}/></h1>
              <h3 className='hero-h3'><SplitText data={banner.catchP[userLang]} direction={textAnim.h3}/></h3>
              <h2 className='hero-h2'><SplitText data={banner.catchP[userLang]} direction={textAnim.h2}/></h2>
            </div>
      
            {/* <p>{banner.intro[userLang]}</p> */}

              <Image
                src={"fake"}
                loader={myLoader}
                sizes={'100%'}
                priority={true}
                fill
                style={{objectFit:'cover'}}

              />

            <div className={`hero-img ${Styles.imgBox}`}>
            </div>
            {/* <HomeIntro userLang={userLang} banner={banner}/> */}

        </div>

    )
}

export default HeroBanner
