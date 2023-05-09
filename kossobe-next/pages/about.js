import React from 'react'
import { useStateContext } from '../context/StateContext'
import TrustClient from '../component/content/TrustClient';
import { client } from '../Utils/sanityClient';
//import styles from '../styles/Pages/About.module.css'
import ComplexText from '../component/ui/ComplexText'
import Image from 'next/image'

const About = ({clientDatas, aboutDatas}) => {

  const {userLang} = useStateContext();

  return (
    <div>
      <div className='page-header'>
            <h1 className="page-title">
            {userLang.includes('fr') ? 'A propos de Kossobe' 
            : userLang.includes('de')? 'Uber kossobe' 
            : 'About Kossobe'}
              </h1>
              <p>Apprennez en plus sur nous</p>
      </div>

      <div>
      {aboutDatas.map((data,i)=>{
        return(
            <div key={i}>
                <h4>{data.name}</h4>
                <ComplexText data={datat.text}/>
                <Image/>
            </div>
        )
      })}
      </div>

      <TrustClient datas={clientDatas}/>

    </div>
  )
}

export default About

export async function getStaticProps(){

  const clientDatas = await client.fetch(`*[_type == "trustClient"]`);
  const aboutDatas = await client.fetch(`*[_type == "about"]`);
  return {
    props: {
      clientDatas,
      aboutDatas
      
    },
    revalidate: 1,
  };
}; 