import React from 'react'
import Styles from './CardItem.module.css'
import { FaArrowRight } from 'react-icons/fa'

const CardItem = ({cardUi}) => {



  return (
    <div className={`${Styles.card} ${cardUi ? Styles.card2 : ''}` }>

      <div className={Styles.cardImg}/>
      <div className={Styles.cardInfo}>
        <p>Nom de l'article</p>
        <p></p>
      </div>

      <div className={Styles.cardBtnBox}>
                      <svg  className={Styles.svg}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z"></path>
                        <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z"></path>
                        </svg>
                          <button> <FaArrowRight/> </button>
                        <svg  className={Styles.svg2}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z"></path>
                        <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z"></path>
                        </svg>
    </div>
    </div>
  )


}

export default CardItem