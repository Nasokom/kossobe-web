import React, { createContext, useContext, useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import {client} from '../Utils/sanityClient'

const Context = createContext();

export const StateContext = ({children}) => {

    const[showMenu,setShowMenu] = useState(false);
    const[isMobile,setIsMobile] = useState(false);
    const [userLang,setUserLang] = useState('en');
<<<<<<< HEAD



    useEffect(()=>{      
=======
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
>>>>>>> design2
        window.innerWidth <= 700 ? setIsMobile(true) : setIsMobile(false);
        const userLanguage = navigator.language || navigator.userLanguage;
        userLanguage.includes('fr') ? setUserLang('fr')
        : userLanguage.includes('de') ? setUserLang('de')
        : setUserLang('en');
        //console.log(userLang)
    //},[router.query.slug && router.query.slug, appColors])
        },[appColors])
    
    return (
        <Context.Provider
        value={{
            showMenu,
            setShowMenu,
            isMobile,
            setIsMobile,
            userLang,
            setUserLang,
<<<<<<< HEAD
=======
            theme,
            setTheme,
            serviceMsg,
            setServiceMsg,
            router,
            appColors,
            setAppColors,
>>>>>>> design2
        }}
        >
        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);

