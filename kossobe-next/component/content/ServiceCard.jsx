import React, {useEffect} from 'react';
import styles from '../../styles/Pages/Services.module.css';
import { urlFor } from '../../Utils/sanityClient';
import Image from 'next/image';
import Link from 'next/link';
import { useStateContext } from '../../context/StateContext';
import ComplexText from '../Ui/ComplexText'
import {FaArrowRight} from 'react-icons/fa'
import { useState } from 'react';


const ServiceCard = ({data,i, color1, color2, selectedCard, setSelectedCard}) => {

    const {userLang, setServiceMsg} = useStateContext();

    const myLoader = () =>{return data.image && urlFor(data.image).url()}

    const color = i == 0 || i == 2 ? color2 : color1;
    const bg = i == 0 || i == 2 ? color1 : color2;

    function a(a){
      setSelectedCard(a)
    }

    useEffect(()=>{

    },[selectedCard])

  return (

    <div className={`service-card ${styles.card}`} 
      style={{transform:`${i > 0 ? `translate(0px, -${4*i}vh)` : "0"}`,
      backgroundColor: i == 0 || i == 2 ? color1 : color2,
      color:i == 0 || i == 2 ? color2 : color1,
      }} onClick={()=>a(i)}>

                <div className={styles.cardTop} >
                    <h2 style={{color}}>{data.name[userLang]}</h2> 
                    <span style={{color,border:`4px solid ${color}`}}>0{i+1}</span>
                </div>

            <div className={styles.wrapper} style={{gridTemplateRows: `${selectedCard !== i ? '0fr' : '1fr'}`}}>

              <div className={styles.inner}>
                <div className={styles.content} style={{bg}}>
                  <div className={`service-card-text ${styles.cardText}`} style={{color, pointerEvents:'none'}}>
                    <ComplexText data={data.hasOwnProperty('text') && data.text[userLang]}/>
                  </div>
                  <div className={styles.imgBox} style={{backgroundColor:bg}}>
                    <Image loader={myLoader} fill  style={{objectFit:'cover'}}sizes={'100%'}src={'bjr'}alt=''/>
                  </div>
                </div>

              {/* Contact */}
                 <div className={styles.cardBottom}>
                  <div className={styles.bottomText}>
                    <p style={{color:'white'}}>
                     {userLang.includes('fr') ? 'intéressé par ce service ? ' 
                    : userLang.includes('de') ? 'Interesse an dieser Dienstleistung ?'
                    : 'interested in this service ?' }
                    </p>
                    <p style={{color:'white'}}> {userLang.includes('fr') ? 'Contactez nous' 
                      : userLang.includes('de') ? 'Kontaktiere uns'
                      : 'Contact us' }</p>
                  </div>

                    <Link href={'/contact'}>

                      <button className={styles.btn} onClick={()=>setServiceMsg(data.name)}>
                        <div style={{color, border:`6px solid ${bg}`}}>
                          <FaArrowRight/>
                        </div>
                      </button>
                     </Link>
                  </div>
              </div>
            </div>
    </div>
  )
}

export default ServiceCard