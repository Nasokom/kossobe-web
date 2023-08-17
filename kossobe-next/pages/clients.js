import React, {useEffect, useState} from 'react'
import Styles from '../styles/Pages/TrustClient.module.css'
import {urlFor, client} from '../Utils/sanityClient'
import Image from 'next/image'
import { useStateContext } from '../context/StateContext'
import {FaArrowRight} from 'react-icons/fa'
import Link from 'next/link'
import ComplexText from '../component/Ui/ComplexText'

const Clients = ({datas,appColors}) => {

  const {userLang} = useStateContext()


  
  useEffect(()=>{

  },[])

  return (
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
                <div key={i} className={Styles.card}
                style={colorsF()}>
                    <div className={Styles.cardText}>
                      <h3>{data.name}</h3>
                    </div>

                    <div className={Styles.imgBox}>
                        <Image loader={imgLoader} fill 
                        style={{objectFit:'contain'}}
                        sizes={'100%'}src={'bjr'}alt=''/>
                    </div>

                        <Link href={data.url} target='_blank'>
                      <div className={Styles.cardBtnBox}>
                      <svg  className={Styles.svg}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#F9F8F6"></path>
                        <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#ffffff"></path>
                        </svg>
                          <button> <FaArrowRight/> </button>
                        <svg  className={Styles.svg2}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#F9F8F6"></path>
                        <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#ffffff"></path>
                        </svg>
                      </div>
                        </Link>
                </div>
                )
            })}
        </div>

    </div>
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