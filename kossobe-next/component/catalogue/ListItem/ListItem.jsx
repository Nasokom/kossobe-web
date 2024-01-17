import React, {useRef, useState} from 'react'
import styles from '../ListItem/style.module.css'
import CardItem from '../CardItem/CardItem'
import NavCatalogue from '../NavCatalogue/CatalogueNav'

const ListItem = () => {

const x = new Array(1,2,3,2,1,1,1,0,0,1,3,4,4)
const main = useRef(null)

const [cardUi,setCardUi] = useState(false)

function switchCardUi(){
  const cardNode = main.current.querySelector('.catalogueCard')
  const cards = main.current.querySelector('.catalogueCard')

  cardNode.classList.contains('.smallCatalogueCardUi') ? 
  cards.forEach(card=> { card.classList.remove('.smallCatalogueCardUi')})
  : cards.forEach(card=> { card.classList.add('.smallCatalogueCardUi')})

}
  
  return (
    <div className={styles.parent} ref={main}>

      <NavCatalogue cardUi={cardUi} setCardUi={setCardUi}/>
        
        {x.map((x,i)=>{
            return(
                <CardItem cardUi={cardUi}/> 
            )
        })}

    </div>
  )
}

export default ListItem