import React from 'react'
import { urlFor } from '../../Utils/sanityClient';
import Image from 'next/image';
import { useStateContext } from '../../context/StateContext';
//import '../styles/banner.css';

const HeroBanner = ({banner}) => {

    const {userLang} = useStateContext();

    const myLoader = () => {
        return banner.image && urlFor(banner.image)
      }

    return (

        <div className="hero-banner-container">
            <div className='hero-banner-text-container'>
                <h3>{banner.intro[userLang]}</h3>
                <h1>{banner.catchP[userLang]}</h1>
                <h3>{banner.text1}</h3>
                <h3>{banner.text2}</h3>
                <h3>{banner.text3}</h3>
             </div>

             <Image
            loader={myLoader}
            src={'bjr'}
            alt={banner.imgDesc}
            width={600}
            height={500}
            id="banner-image"
            />
        </div>

    )
}

export default HeroBanner
