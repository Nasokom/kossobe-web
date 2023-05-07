import React from 'react'
import Link from 'next/link';
import { useStateContext } from '../../context/StateContext';

const FooterBanner = ({banner: { intro, catchP}}) => {

    const {userLang} = useStateContext() 
    return (
        <div className="footer-banner gradient-bg">
                <div className='footer-banner-text'>
                    <h3>{intro[userLang]}</h3>
                    <h1>{catchP[userLang]}</h1>
                </div>
                <div className='footer-banner-btn-container'>
                 <Link href={"/contact"}>
                     <button type="button" className='footer-banner-btn'>Contactez nous</button>
                 </Link>
                </div>
        </div>
    )
}

export default FooterBanner
