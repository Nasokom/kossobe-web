import React,{useState, useEffect, useRef} from 'react'
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeBtn = () => {

    const [theme, setTheme] = useState(false) 

    const main = useRef(null)
    useEffect(()=>{
        //local storage is used to override OS theme settings
        if(localStorage.getItem("theme")){
            if(localStorage.getItem("theme") == "dark"){
                setTheme(true)
            }else{
                setTheme(false)
            }
        } 
        
        if(!window.matchMedia) {
            //matchMedia method not supported
            return false;
        } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
            //OS theme setting detected as dark
            setTheme(true)
        }else{
            setTheme(false)
        }
    
    },[])

    useEffect(()=>{

        //Todo Change Theme
        theme ? document.documentElement.setAttribute("data-theme", "dark") 
        : document.documentElement.setAttribute("data-theme", "light") ;

        // TODO dynamic style component
       /*  if(theme){
            main.current.querySelector('.theme-logo').classList.add('btnDark')
            main.current.style.paddingLeft = "10px"
        }else{
            main.current.querySelector('.theme-logo').classList.remove('btnDark')
            main.current.style.paddingLeft = "40px"
        } */
    })

  function switchTheme() {

    setTheme(!theme)

    if (theme) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }    
}

  return (
    <button className="theme-btn" name="Theme button" aria-label="theme button" onClick={()=>switchTheme()} ref={main}>
        {theme ? 'dark mode' : 'light Mode'}
       <span className="theme-logo">{theme ? <FiMoon/> : <FiSun/>}</span> 
    </button>
  )
}

export default ThemeBtn