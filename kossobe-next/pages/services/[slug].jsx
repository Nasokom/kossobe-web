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
import {FaMusic} from 'react-icons/fa'
import service from '../../../kossobe-sanity/schemas/service';
import ScrollRouter from '../../component/Ui/ScrollRouter';
import Container from '../../component/services/Container';


const ServicePage = ({services, categories, nextIndex}) => {
  
  const {userLang,router} = useStateContext();
  const [disableScroll, setDisableScroll] = useState(false)
  const main = useRef(null)

  useEffect(()=>{

    setTimeout(()=>{
      document.documentElement.style.overflow ="auto"
    },500)
    
  },[services])
 

  const [selectedCard, setSelectedCard] = useState(0);
  const filterCateg = categories.filter(function(a){return a.slug.current != services.slug.current})
  const nextSlug = services.slug.current == 'boutique' ? 'pedagogie' : services.slug.current == 'pedagogie' ? 'live' : 'boutique'


  function routerBtn(e){
    e.target.classList.add('btnRouterAnim');
    document.documentElement.style.overflow ="hidden"
    setTimeout(()=>{
      router.push(`/services/${e.target.value}`)
    },500)
  }


  return (
  <div className={Styles.container}>

        {/* NAv */}
        <div className={Styles.nav}>
          {filterCateg.map((categ,i)=>{
            return(<button value={categ.slug.current} key={i} 
                    onClick={(e)=>routerBtn(e)} style={{backgroundColor: categ.color.hex ? categ.color.hex : 'blue', color:categ.colorTxt.hex ? categ.colorTxt.hex :'black' }}>
                      {categ.name[userLang]}
                  </button>)})}
        </div>
          
        {/* Header */}
        <div className={`${Styles.header}`}>
          <h1 className='reverseAnim' style={{backgroundColor:services.color? services.color.hex : 'blue',color: services.colorTxt.hex ? services.colorTxt.hex : 'black' }}>
            {services.name && services.name[userLang]}
          </h1>
        </div>
            
        {/* Intro  */}
        <div className={Styles.intro} id="introAnim">

          <div className={Styles.intro_text}>
            <h3>{services.introTitle[userLang]}</h3>
            <ComplexText data={services.introText[userLang]}/>
          </div>  
          <ul>
            {services.list.map((l,i)=>{
              return <li key={i} ><span style={{backgroundColor: services.color.hex}}><FaMusic/></span>{l[userLang]}</li>
            })}
          </ul>

        </div>

        {/* Content */}
      {/*   {services && <div className={Styles.service_container} ref={main} style={{minHeight:'100vh',}}>
            {services.services.map((service,i)=>{
                  return(
                    <ServiceCard data={service} i={i}
                      selectedCard={selectedCard}
                      setSelectedCard={setSelectedCard}
                      key={i}
                      color1={services.color.hex}
                      color2={services.colorTxt.hex}
                      />)})}
        </div>} */}

        <Container services={services} />
        
        {/* //!! Scroll router */}
       {/*  {!disableScroll && <ScrollRouter nextIndex={nextIndex} nextSlug={nextSlug}  setDisableScroll={setDisableScroll}categories={categories} currentSlug={services.slug.current} router={router}/>} */}


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
    const unSortedCateg = await client.fetch(categoryQuery);
    const categories =  unSortedCateg.sort(function(a,b){return a.ordre-b.ordre})

    const arrLght = categories.length -1
    const index = categories.findIndex((a)=>a.slug.current == slug);
    const nextIndex = index == arrLght ? 0 : index+1

    return {
      props: { services, categories,nextIndex},
      revalidate: 3,
    }
  }

export default ServicePage
