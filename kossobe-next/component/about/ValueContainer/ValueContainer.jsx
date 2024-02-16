import React, {useEffect} from 'react'
import Styles from './valueContainer.module.css'
import ComplexText from '../../Ui/ComplexText'

const ValueContainer = ({datas,userLang, title,h2,appColors}) => {

    console.log(appColors)
    useEffect(()=>{

    },[datas, userLang])


  return (

    <div className={Styles.parent}>

    <h2>{h2}</h2>
    
    <h3>{title}</h3>
    
        <div className={Styles.cardBox}>
            {datas.map((data,i)=>{

                return (
                    <div className={Styles.card} key={i} 
                    style={{backgroundColor:appColors[i]&&appColors[i].color.hex,
                            color:appColors[i]&&appColors[i].colorTxt.hex
                    }}>
                        <h4> {data.name[userLang]}</h4>
                        <div>
                            <ComplexText data={data.text[userLang]}/>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ValueContainer