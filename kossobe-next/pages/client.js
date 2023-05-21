import React from 'react'
import {client, urlFor} from '../Utils/sanityClient'
import { useStateContext } from '../context/StateContext'
import Image from 'next/image'
import styles from '../styles/Pages/Client.module.css'
const Client = ({datas}) => {

    const {userLang} = useStateContext()


  return (
    <div className='page'>

        <div className='page-header'>  
            <h1 className="page-title">
            {userLang.includes('fr') ? 'Ils nous ont fait confiance' 
            : userLang.includes('de')? 'Sie haben uns vertraut' 
            : 'They trusted us'}
              </h1>
         </div>

        <div className={styles.container}>

            {datas.map((data,i)=>{
                const myLoader = () => {return data.image && urlFor(data.image)}
                return(

                    <div className={styles.card}>
                        <img
                        loader={myLoader}
                        src={data.image && urlFor(data.image)}
                        alt={`${data.name} logo`}
                        //height={200}
                        onLoadingComplete={(img) =>{
                            console.log(img.naturalWidth)
                            console.log(img.naturalHeight)
                        }} 
                        fill={true}
                        />
                    </div>

                )
            })}

        </div>
    </div>
  )
}

export default Client

export async function getStaticProps(){

    const datas = await client.fetch(`*[_type == "trustClient"]`);
    return {
      props: {
        datas
      },
      revalidate: 1,
    };
  }; 