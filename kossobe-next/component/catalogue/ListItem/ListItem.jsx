import React from 'react'
import styles from '../ListItem/style.module.css'
import CardItem from '../CardItem/CardItem'

const ListItem = () => {

const x = new Array(1,2,3,2,1,1,1,0)
  
  return (
    <div className={styles.parent}>

        
        {x.map((x,i)=>{
            return(
                <CardItem/> 
            )
        })}

    </div>
  )
}

export default ListItem