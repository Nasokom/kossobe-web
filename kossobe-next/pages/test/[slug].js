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
import {FaAngleUp, FaAngleDown} from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger);

const ServicePage = ({services, category}) => {

    const {userLang} = useStateContext();
    const [animProgress, setAnimProgress] = useState(0)

    const main = useRef(null)

    useIsomorphicLayoutEffect(() => {
FaAngleDown
        const servL = []

        services.services.forEach((ser,i)=>{
            servL.push(ser.content.length)
            console.log(servL)
        })

        const ctx = gsap.context((self) => {

            const imgsBox = self.selector('.all_img_box');
            const textBox = self.selector('.all_txt_box');
            const itemsL =main.current.querySelectorAll('.un_txt').length
            const titles = self.selector('.all_title_box')
            
             const tl = gsap.timeline({
                 onUpdate: ()=>setAnimProgress(tl.progress()),
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
                tl.pause(2)
                i !==0 && tl.to(imgsBox, {
                   y:`${i*100}%`,
                 },i-1)
      
                 i !==0 &&  tl.to(textBox, {
                    y:`-${i*100}%`,
                },i-1)
             } 


             //constrol progress

             const prevBtn = main.current.querySelector('#prev-btn');
             const nextBtn = main.current.querySelector('#next-btn');
             prevBtn.addEventListener('click',()=>updateProgress(0))
             nextBtn.addEventListener('click',()=>updateProgress(1))

             function updateProgress(i){
                
                var progress = tl.progress(); 
                tl.progress( progress + 1/itemsL); 

                if(i == 1){
                    tl.progress( progress + 1/itemsL ); 
                    var pr = tl.progress(); 
                    pr >= 1 ? nextBtn.style.opacity="O" :  nextBtn.style.opacity="1"
                }else{
                    tl.progress( progress - 1/itemsL ); 
                    var pr = tl.progress();
                    pr <= 0 ? nextBtn.style.opacity="O" :  nextBtn.style.opacity="1"
                }
            }

           


             servL.forEach((serv,i)=>{ 

                const newAr = servL.slice(0,i+1) // tronquer de l'index au debut 

                const initialValue = 0; 
                const sumAr = // additioner new array
                newAr.reduce((accumulator, currentValue) => accumulator + currentValue,initialValue);
               /*  console.log('######################################')
                console.log( 'sumImg : ' + sumAr)
                console.log( 'index : ' + i)
                console.log('last index : ' + (servL.length -1))
                console.log('not index : ' + (i !== servL.length -1) ) */
                i !== servL.length -1 && 
                tl.to(titles, {
                    y:`-${(i+1)*8}vh`,
                },sumAr-1)
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

            <div className='button_box'>
                <button id="prev-btn" 
                    style={{opacity:`${animProgress <= 0 ? '0.2' : '1'}`, cursor:`${animProgress <= 0 ? 'unset' : 'pointer'}`}}>
                    <FaAngleUp/>
                </button>
                <button id="next-btn" 
                 style={{opacity:`${animProgress >= 1 ? '0.2' : '1'}`, cursor:`${animProgress >= 1 ? 'unset' : 'pointer'}`}}>
                    <FaAngleDown/>
                </button>
            </div>

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


