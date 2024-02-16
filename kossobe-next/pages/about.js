import React, {useRef,useState} from 'react'
import { useStateContext } from '../context/StateContext'
import { client, urlFor } from '../Utils/sanityClient';
import Image from 'next/image'
import ComplexText from '../component/Ui/ComplexText';
import styles from '../styles/Pages/About.module.css'
import { gsap, selector } from 'gsap';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import {FaHeart} from 'react-icons/fa'
import ValueContainer from '../component/about/ValueContainer/ValueContainer';
import LastSection from '../component/about/LastSection/LastSection';
import IntroSection from '../component/about/introSection/IntroSection';


const About = ({appColors, data}) => {

  const {userLang} = useStateContext();

  //Split string 

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <h1>{userLang.includes('fr') ? 'Apprennez en plus sur nous' : userLang.includes('de') ? 'lerne mehr über uns' : 'Learn more about us'}</h1>
        
      <ValueContainer appColors={appColors} h2={data.name[userLang]} datas={data.values.valeur} title={data.values.title[userLang]}userLang={userLang}/>
      </div>

      <IntroSection datas={data.intro} userLang={userLang}/>
      <LastSection datas={data.keyPoint} userLang={userLang}/>
     
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