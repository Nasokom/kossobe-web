import React from 'react'
import { useStateContext } from '../context/StateContext'

const about = () => {

  const {userLang} = useStateContext();
  
  return (
    <div>
      <div className='page-header'>
            <h1 className="page-title">
            {userLang.includes('fr') ? 'A propos de Kossobe' : userLang.includes('de')? 'Uber kossobe' : 'About Kossobe'}
              </h1>
              <p>A propos de kossobe</p>
      </div>
    </div>
  )
}

export default about