import React from 'react'
import Style from './CardValue.module.css'

const CardValue = () => {
  return (

    <div className={Style.card}>
        CardValue
    </div>

  )
}

export default CardValue

/* <div className={styles.valuesContainer}>
                  
                    <ul className={`valueList ${styles.valuesList}`}>
                      {data.values.valeur.map((vName,i)=>{
                        return(
                          <li key={i}>
                             <FaHeart/> 
                             {vName.name[userLang]}</li>
                      )
                      })}
                    </ul>

                    <div className={`valuesImg ${styles.valuesImg}`}>
                      <div className={`valueTxtBox ${styles.valueTxtBox}`}>
                    {data.values.valeur.map((vName,i)=>{
                      return <ComplexText data={vName.text[userLang]} key={i}/>
                    })}
    </div>
*/