import React, { useEffect,useState, useRef } from 'react'
import { client } from '../../Utils/sanityClient';
import Link from 'next/link';
import { useStateContext } from '../../context/StateContext';
import ComplexText from '../../component/Ui/ComplexText';
import Styles from '../../styles/Pages/Services.module.css'
import { gsap, selector } from 'gsap';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '../../Utils/isomorphicLayout';

gsap.registerPlugin(ScrollTrigger);

const ServicePage = ({services, category}) => {

    const {userLang} = useStateContext();
    console.log(services.services)
    const main = useRef(null)
    useIsomorphicLayoutEffect(() => {

      //setImgW(window.innerWidth)

      const ctx = gsap.context((self) => {
   
          //main.current.querySelector('#crowd3')

               const crowd3 = self.selector('#crowd3');
                const card = main.current.querySelectorAll('.service-card');
     
               const tl = gsap.timeline({
                 scrollTrigger: {
                   trigger: main.current,
                   start:"top top",
                   end: "+=1500px",
                   scrub: true,
                   pin: true,
                 }
               });
   
              card.forEach((elt,i)=>{

                 i > 0 && tl.to(elt,{
                  y:-300*i
                })   
              })

           }, main);
           return () => ctx.revert();
         }, []);
   

    
  return (
    <div>
        <div className='page-header'>
            <h1>{userLang.includes('fr') ? 'Nos Services' : userLang.includes('de') ? 'Unsere Dienstleistungen': 'Our Services' }</h1>
            <p>Decouvrez les Services que nous proposons</p>
        </div>

    <div  ref={main}>
        <div className={Styles.nav}>

            {category.map((categ,i)=>{
              return( 
                <Link href={`/services/${categ.slug.current}`}>
                        <button className={services.name[userLang] == categ.name[userLang] && Styles.btn_active}>
                            {categ.name[userLang]}
                        </button>
                    </Link>
                )
              })}

        </div>

        <div className={Styles.service_container}>
            {services.services.map((service,i)=>{
              return(
                <div key={i} className={`service-card ${Styles.card}`}>
                       <h2>{service.name[userLang]}</h2> 

                        <ComplexText data={service.text[userLang]}/>

                    </div>
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
