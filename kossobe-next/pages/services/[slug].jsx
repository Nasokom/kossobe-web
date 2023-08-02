import React, { useEffect,useState, useRef } from 'react'
import { client, urlFor } from '../../Utils/sanityClient';
import Link from 'next/link';
import Image from 'next/image';
import { useStateContext } from '../../context/StateContext';
import ComplexText from '../../component/Ui/ComplexText'
import Styles from '../../styles/Pages/Services.module.css'
import { gsap, selector } from 'gsap';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '../../Utils/isomorphicLayout';
import ServiceCard from '../../component/content/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

const ServicePage = ({services, category}) => {

    const {userLang} = useStateContext();
    //console.log(services.services)
    const main = useRef(null)
  //console.log(services.color.hex)
    
  return (
    <div>
      
        <div className={Styles.header}>
           <h1 style={{backgroundColor:services.color.hex ? services.color.hex : 'blue',color: services.colorTxt.hex ? services.colorTxt.hex : 'black' }}>
            {services.name && services.name[userLang]}
          </h1>
        </div>
        
    <div  ref={main}>

        <div className={Styles.nav}>
            {category.sort(function(a,b){return a.ordre-b.ordre}).map((categ,i)=>{
              return( 
                <Link href={`/services/${categ.slug.current}`} key={i}>
                        <button className={services.name[userLang] == categ.name[userLang] && Styles.btn_active}
                        style={{backgroundColor: categ.color.hex ? categ.color.hex : 'blue'}}
                        >
                            {categ.name[userLang]}
                        </button>
                    </Link>
                )})}
        </div>

        <div className={Styles.service_container}>
            {services.services.map((service,i)=>{
                  return(
                    <ServiceCard data={service} key={i}/>
                  )
              })}
        </div>

        </div>
    </div>
  )
}


export const getStaticPaths = async () => {
    const query = `*[_type in "service"]`;

    const serviceCategs = await client.fetch(query);
  
    const paths = serviceCategs.map((serviceCateg) => ({
      params: { 
        slug: serviceCateg.slug.current,
      }
    }));
  
    return {
      paths,
      fallback: 'blocking'
    }
  }
  
  export const getStaticProps = async ({ params: {slug}}) => {
    const query = `*[_type == "service" && slug.current =="${slug}"][0]`
    const services = await client.fetch(query);

    const categoryQuery = '*[_type == "service"]';
    const category = await client.fetch(categoryQuery);

    
    return {
      props: { services, category},
      revalidate: 3,
    }
  }

export default ServicePage
