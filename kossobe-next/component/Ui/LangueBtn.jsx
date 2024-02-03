import React from 'react'
import { useStateContext } from '../../context/StateContext'
import {MdOutlineLanguage} from 'react-icons/md'

const LangueBtn = () => {

const {userLang,setUserLang} = useStateContext()

function changeLangue(e){
    const newLang = e.target.value;
    setUserLang(newLang)
}

  return (
    <button className='theme-btn' name="langue button"  aria-label="langue button" id='langue-btn' for="langueBtn">
        <span><MdOutlineLanguage/></span>
        <select name="" id="langueBtn" value={'vzz'} onChange={(e)=>changeLangue(e)}>
            <option value={userLang}>{userLang == 'fr' ? 'Francais': userLang == 'de' ? 'Deutsch' : "English" }</option>
            { userLang !== 'fr' && <option value="fr">Francais</option>}
            {userLang !== 'de' && <option value="de">Deutsch</option>}
            {userLang == 'fr' && <option value="en">English</option>}
            {userLang == 'de' && <option value="en">English</option>}
        </select>
    </button>

  )
}

export default LangueBtn