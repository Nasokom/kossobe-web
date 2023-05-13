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

    const [itemCount, setItemCount] = useState(-1);

    const servL = []

    
    
    useIsomorphicLayoutEffect(() => {
        services.services.forEach((ser,i)=>{
            
            servL.push(ser.content.length)
            //console.log(servL)
        })
        const ctx = gsap.context((self) => {
            const imgsBox = self.selector('.all_img_box');
            const textBox = self.selector('.all_txt_box');
            const itemsL =main.current.querySelectorAll('.un_txt').length
            const titles = self.selector('.all_title_box')
            
             const tl = gsap.timeline({
               scrollTrigger: {
                 trigger: main.current,

                 start:"-10% top",
                 end: "+=1500px",
                 scrub: true,
                 pin: true,
                 paused: true,
               }
             });

             for(let i = 0 ; i < itemsL ; i ++){

                 tl.to(imgsBox, {
                   y:`${i*100}%`,
                 },i)
      
                 tl.to(textBox, {
                    y:`-${i*100}%`,
                },i)
             } 


             servL.forEach((serv,i)=>{
                setItemCount(prevCount => prevCount + parseInt(serv))
                console.log(parseInt(serv))
                tl.to(titles, {
                    y:`-${i*8}vh`,
                  },i+1)
                  console.log(itemCount)
            })

         }, main);
         return () => ctx.revert();
       }, [services]);
    
  return (
    <div className='page'>
      
        <div className='page-header'>
            <h1>{userLang.includes('fr') ? 'Nos Services' : userLang.includes('de') ? 'Unsere Dienstleistungen': 'Our Services' }</h1>
            <p>Decouvrez les Services que nous proposons</p>
        </div>

    <div ref={main} >
      
        <div className={Styles.nav}>
            {category.map((categ,i)=>{
              return( 
                <Link href={`/test/${categ.slug.current}`} key={i}>
                        <button className={services.name[userLang] == categ.name[userLang] && Styles.btn_active}>
                            {categ.name[userLang]}
                        </button>
                    </Link>
                )
              })}
        </div>

        <div className='scroll_container'>
            <div className='service_card'>
            <div className='scroll-title'>
                <div className='all_title_box'>
                {services.services.map((service,i)=>{
                    return(<div className='service_title' key={i}>
                                {service.name[userLang]}
                                </div>)
                            })}
                </div>
            </div>

            <div className='all_txt_box'>
                {services.services.map((service,i)=>{
                    return(<div className='service_texts' key={i}>
                                {service.content.map((content,i)=>{
                                    return(
                                        <div className='un_txt' key={i}>
                                            <ComplexText data={content.text[userLang]}/>
                                        </div>
                                    )
                                })}
                            </div>)
                        })}
            </div>

            <div className='all_img_box'>
                {services.services.map((service,i)=>{
                    return(
                        <div className='service_imgs' key={i}>
                                    {service.content.map((content,i)=>{

                                        const myLoader = () =>{return content.image && urlFor(content.image).url()}
                                        return(
                                            <div className='un_img' key={i}>
                                                 <Image 
                                                 loader={myLoader}
                                                 fill={true}
                                                 sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, 100%"
                                                 src={'bjr'}
                                                 alt=''
                                                 style={{objectFit:'cover'}}
                                                 className='img'
                                                 />
                                            </div>
                                        )
                                    })}
                                </div>
                                    )
                                })}
            </div>
            </div>
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
      revalidate: 1,
    }
  }

export default ServicePage
