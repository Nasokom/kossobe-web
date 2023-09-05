import React, {useState, useEffect} from 'react'
import NavBar from './Navbar'
import Footer from './Footer'
import Loading from './Loading'
import ComingSoon from './ComingSoon'
<<<<<<< HEAD
=======
import {client} from '../../Utils/sanityClient'
>>>>>>> design2


import { useStateContext } from '../../context/StateContext'


const Layout = ({children,colors}) => {

  const {setAppColors,appColors} = useStateContext()
  /* console.log(colors) */

    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
<<<<<<< HEAD
  
      setIsLoading(true)
    document.documentElement.style.overflow ="hidden"


  },[])

=======

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
>>>>>>> design2
  
    return (
      <>
      <NavBar/>
      
          <main>
<<<<<<< HEAD
          { isLoading ? <ComingSoon/> : children}
=======
            
            {appColors && children}
>>>>>>> design2

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