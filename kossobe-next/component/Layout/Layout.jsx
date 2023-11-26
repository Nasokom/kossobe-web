import React, {useState, useEffect} from 'react'
import NavBar from './Navbar'
import Footer from './Footer'
import Loading from './Loading'
import ComingSoon from './ComingSoon'


const Layout = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
  
      setIsLoading(true)
    document.documentElement.style.overflow ="hidden"


  },[])

  
    return (
      <>
      <NavBar/>
          <main>
          { isLoading ? <ComingSoon/> : children}
          </main>
      <Footer/>
      </>
    )
}

export default Layout