import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {

    const[showMenu,setShowMenu] = useState(false);
    const[isMobile,setIsMobile] = useState(false);
    const [userLang,setUserLang] = useState('en');



    useEffect(()=>{      
        window.innerWidth <= 700 ? setIsMobile(true) : setIsMobile(false);
        const userLanguage = navigator.language || navigator.userLanguage;
        userLanguage.includes('fr') ? setUserLang('fr')
        : userLanguage.includes('de') ? setUserLang('de')
        : setUserLang('en');
        console.log(userLang)
    },[])

    
    return (
        <Context.Provider
        value={{
            showMenu,
            setShowMenu,
            isMobile,
            setIsMobile,
            userLang,
            setUserLang,
        }}
        >
        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);