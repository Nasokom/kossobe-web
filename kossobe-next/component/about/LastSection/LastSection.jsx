import React from 'react'
import Styles from './lastSection.module.css'
import ComplexText from '../../Ui/ComplexText'

const LastSection = ({datas,userLang}) => {


  return (

    <div className={Styles.parent}>
          <div className={Styles.container}>
              {datas.map((point,i)=>{
                return(
                  <div className={Styles.card} key={i}>

                      <h3 className='keyCardTitle'>{point.name[userLang]}</h3>
                        <div className={Styles.keyText}>
                          <ComplexText data={point.text[userLang]}/>
                        </div>
                  </div>
                )
              })}
            </div>

        </div>
  )
}

export default LastSection