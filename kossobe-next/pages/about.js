import React, {useRef} from 'react'
import { useStateContext } from '../context/StateContext'
import TrustClient from '../component/content/TrustClient';
import { client, urlFor } from '../Utils/sanityClient';
import Image from 'next/image'
import ComplexText from '../component/Ui/ComplexText';
import styles from '../styles/Pages/About.module.css'
import Card from '../component/Ui/card';
import Container from '../component/Ui/Container';


const About = ({clientDatas, aboutDatas}) => {

  const {userLang} = useStateContext();

  const triData = aboutDatas.sort((a, b) => (a.ordre > b.ordre) ? 1 : -1)

  const main = useRef(null)

  return (
    <div className='page'>
      <div className='page-header'>
            <h1 className="page-title">
            {userLang.includes('fr') ? 'A propos de Kossobe' 
            : userLang.includes('de')? 'Uber kossobe' 
            : 'About Kossobe'}
              </h1>
              <p>Apprennez en plus sur nous</p>
      </div>
      <div ref={main}>
      <Container >
      {triData.map((data,i)=>{
        const myLoader = () =>{return data.image && urlFor(data.image).url()}
        return(
              <Card>
            <div key={i} className={`${styles.card}`}>


             
                {data.name && <h4>{data.name[userLang]}</h4>}

                <div className={'txt txtAnim'}>
                    <ComplexText data={data.text[userLang]}/>
                </div>


                {data.image &&
                <div className={styles.image}>
                      <Image 
                      loader={myLoader}
                      fill={true}
                      sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, 100%"
                      src={'bjr'}
                      alt=''
                      style={{objectFit:'cover'}}
                      className='img'
                      />
                </div>}
            </div>
            </Card>
        )
      })}
      </Container>
      </div>

     {/*  <TrustClient datas={clientDatas}/> */}

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