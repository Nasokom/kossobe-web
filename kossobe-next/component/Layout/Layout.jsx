import React, {useState, useEffect,useRef} from 'react'
import NavBar from './Navbar'
import Footer from './Footer'
import Loading from './Loading'
import ComingSoon from './ComingSoon'
import {client} from '../../Utils/sanityClient'

import { useRouter } from "next/router"

import { useStateContext } from '../../context/StateContext'


const Layout = ({children,colors,bgColor}) => {

  const {setAppColors,appColors,theme} = useStateContext()
  /* console.log(colors) */

    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const scrollPositions = useRef({})
    const isBack = useRef(false)

    useEffect(()=>{

      /*  (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )() */

      fetch('/api/getColors').then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setAppColors(data)
        //console.log(appColors);
      })
      
  

 


    router.beforePopState(() => {
      isBack.current = true
      return true
    })

    const onRouteChangeStart = () => {
      const url = router.pathname
      scrollPositions.current[url] = window.scrollY
    }

    const onRouteChangeComplete = (url) => {
      if (isBack.current && scrollPositions.current[url]) {
        window.scroll({
          top: scrollPositions.current[url],
          behavior: "auto",
        })
      }

      isBack.current = false
    }

    router.events.on("routeChangeStart", onRouteChangeStart)
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart)
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [router])



    useEffect(()=>{

      const r = document.querySelector(':root');
      appColors && r.style.setProperty('--bgColor', !theme ? appColors.colorLigth.hex : appColors.colorDark.hex);

    })
    console.log(bgColor)
      //const r = document.querySelector(':root');
      //r.style.setProperty('--html', theme ? bgColor.colorLight.hex : bgColor.colorDark.hex);

  
    return (
      <>
      <NavBar/>
      
          <main>
            
            {appColors && children}

          </main>
      <Footer/>
      </>
    )
}

export default Layout

export async function getStaticProps(){

  const colors = await client.fetch(`*[_type == "service"]{color,colorTxt}`);
  const bgColor = await client.fetch(`*[_type == "settings"][0]`);

  return {
    props: {
      colors,
      bgColor
    },
    revalidate: 1,
  };
}; 