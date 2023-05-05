import Image from 'next/image'
import React ,{useRef,useEffect,useState} from 'react'
import Menu from './Menu'
import Link from 'next/link'
import { useStateContext } from '../../context/StateContext'

const NavBar = () => {

  const {showMenu, setShowMenu} = useStateContext();

  const nav = useRef(null);

  function toggleMenu(){
    if(showMenu){
      const menuElt = nav.current.querySelector('#menu-container');
      menuElt.querySelector("#menu").style.translate = "-110% 0";
      menuElt.querySelector("#menu").style.borderRadius = "20px";

      setTimeout(()=>{
        setShowMenu(false)
      },550)

    }else{
      setShowMenu(!showMenu)
    }

  }

  return (
    <>
    <nav ref={nav}>
        <button type="button" id="burger-btn" onClick={()=>toggleMenu()}>
            <span className={!showMenu ? 'burger-line1' : 'burger-line11'}></span>
                <span className={!showMenu ? 'burger-line2' : 'burger-line22'}></span>
        </button>

        <Link href={'/'} >
        <button id='logo' aria-label='home'>
        kossobe
        </button>
      </Link>
        
      { showMenu ? <Menu toggleMenu={toggleMenu} /> : null}
    </nav>
    </>
  )
}

export default NavBar;
