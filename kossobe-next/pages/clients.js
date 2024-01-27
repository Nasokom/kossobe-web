import React, {useEffect, useState} from 'react'
import Styles from '../styles/Pages/TrustClient.module.css'
import {urlFor, client} from '../Utils/sanityClient'
import Image from 'next/image'
import { useStateContext } from '../context/StateContext'
import {FaArrowRight} from 'react-icons/fa'
import Link from 'next/link'
import ComplexText from '../component/Ui/ComplexText'
import Head from 'next/head'

const Clients = ({datas,appColors}) => {

  const {userLang} = useStateContext()


  
  useEffect(()=>{

  },[])

  return (

    <>
     <Head>
        <title>{userLang.includes('fr') ? 'Nos clients' : userLang.includes('de') ? 'zufriedene Kunden': 'Trust clients' }</title>
        <meta name="description" content="Contact kossobe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="all" />
        <meta name="author" content="kossobe"/>
        <meta name="publisher" content="Kossobe"/>
        <meta name="copyright" content="Kossobe"/>
        <meta name="page-topic" content="Kossobe"></meta>
    </Head>
    
    

    <div className={Styles.page}>

        <h1>{datas.title[userLang]}</h1>

          <div className={Styles.text}>
            <ComplexText data={datas.text[userLang]}/>
          </div>
        
        <div className={Styles.clientContainer}>

        {datas.clients.map((data,i)=>{
          function colorsF(){
          const rnd =  Math.floor(Math.random() * 3)
          return{color:appColors[rnd].colorTxt.hex,backgroundColor:appColors[rnd].color.hex}
          }


            const imgLoader = () =>{return data.image && urlFor(data.image).url()}

            return(
              <Link href={data.url} key={i} target='_blank'>
                <div className={Styles.card} style={colorsF()}>
                    <div className={Styles.cardText}>
                      <h3>{data.name}</h3>
                    </div>

                    <div className={Styles.imgBox}>
                        <Image loader={imgLoader} fill 
                        style={{objectFit:'contain'}}
                        sizes={'100%'}src={'bjr'}alt=''/>
                    </div>

                        
                      <div className={Styles.cardBtnBox}>
                      <svg  className={Styles.svg}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z"></path>
                        <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z"></path>
                        </svg>
                          <button> <FaArrowRight/> </button>
                        <svg  className={Styles.svg2}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z"></path>
                        <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z"></path>
                        </svg>
                      </div>
                  
                </div>
                </Link>
                )
            })}
        </div>

    </div>
    </>
  )



}

export default Clients

export async function getStaticProps(){

    const appColors = await client.fetch(`*[_type == "service"]{color,colorTxt}`);
    const datas = await client.fetch(`*[_type == "trustClient"][0]`);

    return {
      props: {
        appColors,
        datas
        
      },
      revalidate: 1,
    };
  }; 