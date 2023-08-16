import React, { createContext, useContext, useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import {client} from '../Utils/sanityClient'

const Context = createContext();

export const StateContext = ({children}) => {

    const[showMenu,setShowMenu] = useState(false);
    const[isMobile,setIsMobile] = useState(false);
    const [userLang,setUserLang] = useState('en');
    const [theme, setTheme] = useState(false) 
    const [serviceMsg, setServiceMsg] = useState(null)
    const router = useRouter()
    const [nextI, setNextI] =useState(null)
    const [appColors, setAppColors] = useState(null)

    useEffect(()=>{      
        //THeme
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

        //End Theme
        window.innerWidth <= 700 ? setIsMobile(true) : setIsMobile(false);
        const userLanguage = navigator.language || navigator.userLanguage;
        userLanguage.includes('fr') ? setUserLang('fr')
        : userLanguage.includes('de') ? setUserLang('de')
        : setUserLang('en');
        //console.log(userLang)
    },[router.query.slug && router.query.slug, appColors])
    
    return (
        <Context.Provider
        value={{
            showMenu,
            setShowMenu,
            isMobile,
            setIsMobile,
            userLang,
            setUserLang,
            theme,
            setTheme,
            serviceMsg,
            setServiceMsg,
            router,
            appColors,
            setAppColors,
        }}
        >
        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);

