import React from 'react'
import { urlFor } from '../../Utils/sanityClient';
import Image from 'next/image';
import { useStateContext } from '../../context/StateContext';
import ComplexText from '../Ui/ComplexText';
import Styles from '../../styles/module/Hero.module.css'

const HeroBanner = ({banner}) => {

    const {userLang} = useStateContext();

    const myLoader = () => {
        return banner.image && urlFor(banner.image)
      }

    return (

        <div className={Styles.home_header}>
            <div className={Styles.container}>
              <h1>KOSSOBE</h1>
              <p>{banner.kossTrad[userLang]}</p>
                <h3>{banner.catchP[userLang]}</h3>
                    <ComplexText data={banner.text[userLang]}/>
            </div>
            <p>{banner.intro[userLang]}</p>
        </div>

    )
}

export default HeroBanner
