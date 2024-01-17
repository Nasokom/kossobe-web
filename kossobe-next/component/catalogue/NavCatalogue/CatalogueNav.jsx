import React from 'react'
import Styles from './NavCatalogue.module.css'

const NavCatalogue = ({cardUi,setCardUi}) => {

  return (
    <div className={Styles.nav}>
        <button onClick={()=>setCardUi(!cardUi)} className={`${Styles.btnCardUi} ${cardUi ? Styles.btnCardUi2 : ''}`}/>
    </div>
  )
}

export default NavCatalogue