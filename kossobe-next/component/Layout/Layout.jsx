import React, {useState, useEffect} from 'react'
import NavBar from './Navbar'
import Footer from './Footer'
import Loading from './Loading'
import ComingSoon from './ComingSoon'
import {client} from '../../Utils/sanityClient'


import { useStateContext } from '../../context/StateContext'


const Layout = ({children,colors}) => {

  const {setAppColors,appColors} = useStateContext()
  /* console.log(colors) */

    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{

       (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()

      fetch('/api/getColors').then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAppColors(data)
        console.log(appColors);
      })
    },[])
  
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

  return {
    props: {
      colors
    },
    revalidate: 1,
  };
}; 