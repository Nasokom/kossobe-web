import React from 'react'
import { useStateContext } from '../../context/StateContext'

const HomeCateg = ({data}) => {

    const {userLang} = useStateContext();


  return (
    <div className='discover-ours-services'>
      <h2>Decouvrez nos services</h2>
        <div className='categorie-container'> 
            {data.map((d,i)=>{
                return(
                    <div className={'categorie-card gradient-bg-light'}> 
                        <Link href={slug ? `/services/${slug.current}`: '/' }
                        style={{zIndex:'2', position:"relative"}}>
                        <div>
                        <h3 style={{zIndex:10}}>{d.name[userLang]}</h3>
                        <Image loader={myLoader}
                            src={'bjr'}
                            alt={'cdzc'}
                            layout="fill"
                            objectFit="cover"
                        />
                        </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default HomeCateg