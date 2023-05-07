import React, {useState, useEffect} from 'react'
import NavBar from './Navbar'
import Footer from './Footer'
import Loading from './Loading'


const Layout = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
  
      setTimeout(()=>{
        setIsLoading(false)
      }, 200)
  
    },[])
  
    return (
      <>
      <NavBar/>
          <main>
          { isLoading ? <Loading/> : children}

          </main>
      <Footer/>
      </>
    )
}

export default Layout