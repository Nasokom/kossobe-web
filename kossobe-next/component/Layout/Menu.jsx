import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
//import { client } from '../../Utils/sanityClient';
import styles from '../../styles/Layout/Menu.module.css'
import { useStateContext } from '../../context/StateContext';
import ThemeBtn from '../Ui/ThemeBtn';
import LangueBtn from '../Ui/LangueBtn';

const Menu = ({toggleMenu}) => {

    const {userLang} = useStateContext();

    const menuRef = useRef(null);
    
    useEffect(()=>{

        document.documentElement.style.overflow = "hidden"
        return ()=>{
            document.documentElement.style.overflow = "auto"
        }

    },[])


    return (

        <div id="menu-container" className={`${styles.modalMenu} ${styles.blurbg}`} 
        //onClick={()=>toggleMenu()} 
        >
        <div className={styles.emptyClose} onClick={()=>toggleMenu()}></div>

         <div className={styles.menu} ref={menuRef} id="menu">
            
            <ul className={styles.container}>
               {/*  <div className={styles.img_container}>
                    <Image className={styles.image} src={'/djembe.png'} width="300" height="500" />
                </div> */}

                <Link href="/" className={styles.link}
                    onClick={()=>toggleMenu()}
                >
                        Home
                </Link> 

                <div className={styles.menu_deroulant} data-text="Contact Us" >
                    {userLang.includes('fr') ? 'Nos Services' : userLang.includes('de') ? 'Unsere Services': 'Our Services' }
                    <div className={styles.shrink}>
                        <div>

                        <Link href="/services/boutique"
                        onClick={()=>toggleMenu()}
                        >
                            <span>{userLang.includes('fr') ? 'Boutique' : userLang.includes('de') ? 'Geschäft': 'Shop' }</span>
                        </Link> 

                        <Link href="/services/pedagogie"
                            onClick={()=>toggleMenu()}
                        >
                            <span>{userLang.includes('fr') ? 'Pedagogie' : userLang.includes('de') ? 'Pädagogik': 'Pedagogy' }</span>
                        </Link> 

                        <Link href="/services/live" 
                        onClick={()=>toggleMenu()}
                        >
                            <span> <span>{userLang.includes('fr') ? 'Performance' : userLang.includes('de') ? 'Leistung': 'Performance' }</span></span>
                        </Link> 

                       
                    </div>
                    </div>

                </div>

                <Link href="/about"
                    className={styles.link}    
                    onClick={()=>toggleMenu()}
                >
                     <span>{userLang.includes('fr') ? 'Nous connaître' : userLang.includes('de') ? 'über uns': 'About Us' }</span>
                </Link>

                <Link href="/clients"
                    className={styles.link}    
                    onClick={()=>toggleMenu()}
                >
                     <span>{userLang.includes('fr') ? 'Nos clients' : userLang.includes('de') ? 'zufriedene Kunden': 'Trust clients' }</span>
                </Link>


                <Link href="/contact"
                className={styles.link}   
                onClick={()=>toggleMenu()}
                >
                    <span  data-text="Contact Us">Contact Us </span>
                </Link>

            </ul>
        <div className={styles.btn_box}>
                <ThemeBtn/>
                <LangueBtn/>
            </div>
        </div>

        </div>
    )
}

export default Menu
