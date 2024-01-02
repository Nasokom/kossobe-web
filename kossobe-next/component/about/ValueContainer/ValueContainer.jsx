import React, {useEffect} from 'react'
import Styles from './valueContainer.module.css'
import ComplexText from '../../Ui/ComplexText'

const ValueContainer = ({datas,userLang}) => {

    useEffect(()=>{

    },[datas, userLang])
  return (
    <div className={Styles.parent}>
    
        {datas.map((data,i)=>{
            return (

                <div className={Styles.card} key={i}>
                    <h4> {data.name[userLang]}</h4>

                    <div>
                        <ComplexText data={data.text[userLang]}/>
                    </div>
                </div>
            )
        })}
    
    </div>
  )
}

export default ValueContainer