import React, {useEffect} from 'react'
import ComplexTexts from '../Ui/ComplexText'
import { useStateContext } from '../../context/StateContext'
import Link from 'next/link';
import Styles from '../../styles/module/CategList.module.css'
import Image from 'next/image';
import { urlFor } from '../../Utils/sanityClient';


const CategList = ({data}) => {

  const {userLang} = useStateContext();

  useEffect(()=>{

  },[userLang])

 
  

  return (
    <div className={Styles.parent} id="categList">

      <h2 >Decouvrez nos services</h2>

      <div className={Styles.container}>

          {data.map((d,i)=>{

            const myLoader = () => {
                return d.image && urlFor(d.image).width(200).height(200).url()
            }

            return(
              <Link href={`/services/${d.slug.current}`} key={i}>
              <div className={Styles.card}>
                <div>

                <h3>{d.name[userLang]}</h3>
                <Image 
                loader={myLoader}
                layout={'fill'}
                objectFit="cover"
                fill
                sizes="100%"
                src={'bjr'}
                alt=''
                />
                </div>
              </div>
            </Link>
              )
            })}

        </div>
    </div>
  )
}

export default CategList

