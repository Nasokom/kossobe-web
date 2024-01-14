import React, {useState, useEffect} from 'react'
import NavBar from './Navbar'
import Footer from './Footer'
import Loading from './Loading'
import ComingSoon from './ComingSoon'
import {client} from '../../Utils/sanityClient'


import { useStateContext } from '../../context/StateContext'


const Layout = ({children,colors,bgColor}) => {

  const {setAppColors,appColors,theme} = useStateContext()
  /* console.log(colors) */

    const [isLoading, setIsLoading] = useState(true)

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
      

    },[])


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