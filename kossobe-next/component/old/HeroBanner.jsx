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

        <div className="home-header">
            <div className='container'>
              <h1>KOSSOBE</h1>
              <p>{banner.kossTrad[userLang]}</p>
                <h3>{banner.catchP[userLang]}</h3>
            </div>
        </div>

    )
}

export default HeroBanner
