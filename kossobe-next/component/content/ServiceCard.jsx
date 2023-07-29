import React from 'react';
import styles from '../../styles/Pages/Services.module.css';
import { urlFor } from '../../Utils/sanityClient';
import Image from 'next/image';
import Link from 'next/link';
import { useStateContext } from '../../context/StateContext';
import ComplexText from '../Ui/ComplexText'


const ServiceCard = ({data}) => {

    const {userLang, setServiceMsg} = useStateContext();
  return (
    <div className={`service-card ${styles.card}`}>

        <h2>{data.name[userLang]}</h2> 

        { data.content && data.content.map((content,i)=>{

            const myLoader = () =>{return content.image && urlFor(content.image).width(200).height(200).url()}
            return(
                <div className={styles.content} key={i}>
                    <ComplexText data={content.hasOwnProperty('text') && content.text[userLang]}/>
                     <Image 
                    loader={myLoader}
                    width={200}
                    height={200}
                    src={'bjr'}
                    alt=''
                    />
                </div>
            )})}

                 <div className={styles.contact}>
                    <p>
                     {userLang.includes('fr') ? 'intéressé par ce service ?' 
                    : userLang.includes('de') ? 'Interesse an dieser Dienstleistung ?'
                     : 'interested in this service ?' }
                    </p>
                    <Link href={'/contact'}>
                      <button className={styles.btn} onClick={()=>setServiceMsg(data.name)}>
                      {userLang.includes('fr') ? 'Contactez nous' 
                      : userLang.includes('de') ? 'Kontaktiere uns'
                      : 'Contact us' }
                      </button>
                     </Link>
                </div>
    </div>
  )
}

export default ServiceCard