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



  return (

    <div className={Styles.container} id={"#intro-main"}ref={main}>
           <div className={`introText1 ${Styles.textBox}`}>
                <ComplexText data={banner.text[userLang]}/>
            </div>        
    </div>
  )
}

export default HomeIntro