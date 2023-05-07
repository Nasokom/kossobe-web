import React,{useState, useEffect, useRef} from 'react'
import { FiSun, FiMoon } from 'react-icons/fi';
import { useStateContext } from '../../context/StateContext';


const ThemeBtn = () => {

    const {theme, setTheme} = useStateContext();

    //const [theme, setTheme] = useState(false) 

    const main = useRef(null)

    useEffect(()=>{
        //local storage is used to override OS theme settings
      /*   if(localStorage.getItem("theme")){
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

        //Unmount
        return()=>{
            theme ? document.documentElement.setAttribute("data-theme", "dark") 
        : document.documentElement.setAttribute("data-theme", "light") ;
        } */
    
    },[])

    useEffect(()=>{

        //Todo Change Theme
        theme ? document.documentElement.setAttribute("data-theme", "dark") 
        : document.documentElement.setAttribute("data-theme", "light") ;

        // TODO dynamic style component
        if(theme){
            main.current.querySelector('.theme-logo').classList.add('btnDark')
            main.current.querySelector('div').style.transform = "translateX(-30px)"
        }else{
            main.current.querySelector('.theme-logo').classList.remove('btnDark')
            main.current.querySelector('div').style.transform = "translateX(0px)"
        }
    })

  function switchTheme() {
    setTheme(!theme)

   /*  if (theme) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }     */

}

  return (
    <button className="theme-btn" name="Theme button" aria-label="theme button" 
    onClick={()=>switchTheme()} ref={main}>
        <div>{theme ? 'dark mode' : 'light Mode'}</div>
       <span className="theme-logo">{theme ? <FiMoon/> : <FiSun/>}</span> 
    </button>
  )
}

export default ThemeBtn