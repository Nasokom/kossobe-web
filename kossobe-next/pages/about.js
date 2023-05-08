import React from 'react'
import { useStateContext } from '../context/StateContext'
import TrustClient from '../component/content/TrustClient';
import { client } from '../Utils/sanityClient';

const About = ({clientDatas}) => {

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


      <TrustClient datas={clientDatas}/>

    </div>
  )
}

export default About

export async function getStaticProps(){

  const clientDatas = await client.fetch(`*[_type == "trustClient"]`);
  return {
    props: {
      clientDatas
    },
    revalidate: 1,
  };
}; 