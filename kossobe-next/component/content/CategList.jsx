import React, {useEffect} from 'react'
import ComplexTexts from '../Ui/ComplexText'
import { useStateContext } from '../../context/StateContext'
import Link from 'next/link';

const CategList = ({data}) => {

  const {userLang} = useStateContext();

  useEffect(()=>{

  },[userLang])

  return (
    <div>
      {data.map((d,i)=>{
      return(
        <Link href={`/services/${d.slug.current}`} key={i}>
          <div>
            {d.name[userLang]}
          </div>
        </Link>
          )
        })}
    </div>
  )
}

export default CategList

