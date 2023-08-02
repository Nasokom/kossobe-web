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

      <h2>Nos services</h2>

      <div className={Styles.container}>

          {data.sort(function(a,b){return a.ordre-b.ordre}).map((d,i)=>{

            const myLoader = () => {
                return d.image && urlFor(d.image).width(200).height(200).url()
            }

            return(
              <div className={Styles.card} style={{backgroundColor: d.color.hex ? d.color.hex : 'blue', color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}}>
              
              <div className={Styles.cardTop}>
                
                {d.services && d.services.map((service,i)=>{
                  return(
                    <div className={Styles.categServices} key={i} style={{color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}}>{service.name[userLang]}</div>
                  )
                })}
              </div>

                <h3 style={{color: d.colorTxt.hex ? d.colorTxt.hex : 'black'}}>{d.name[userLang]}</h3>


                <div className={Styles.cardBottom}>

                    <Link href={`/services/${d.slug.current}`} key={i} className={Styles.linkBox}>
                  <button> Discover</button>
                </Link>
                </div>
              {/*   <Image 
                loader={myLoader}
                layout={'fill'}
                objectFit="cover"
                fill
                sizes="100%"
                src={'bjr'}
                alt=''
                /> */}
              </div>
              )
            })}

        </div>
    </div>
  )
}

export default CategList

