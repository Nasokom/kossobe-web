import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { MdQueuePlayNext } from 'react-icons/md'

const ComplexText = ({data}) => {

//This Component render one paragraphe "<p/>", with multiple span inside for the style 
useEffect(()=>{

},[data])
 //console.log(data)
//todo 
    const Span = ({data, defs}) =>{
  
      //console.log(defs)

      const customStyle = {} //Style

      const [defIndex, setDefIndex] = useState(null) //Store markDefs index

      defs.length >= 1 ? defs.forEach((def,i)=>{

        data.marks &&  data.marks.forEach((mark)=>{//Select 1 style

          if( mark == def._key){
            /* console.log(def._key) */
              customStyle.href = def.href
          }
          
          switch(mark) {
            case 'strong':
              customStyle.fontWeight = 'bolder'
              break;
              case 'underline':
                customStyle.textDecoration = 'underline'
                break;
                case 'em':
                  customStyle.fontStyle = 'italic'
                  break;
                  default:
                    // code block
                  }  
           })
          })
          :
          data.marks &&  data.marks.forEach((mark)=>{//Select 1 style
            
            switch(mark) {
              case 'strong':
                customStyle.fontWeight = 'bolder'
                break;
                case 'underline':
                  customStyle.textDecoration = 'underline'
                  break;
                  case 'em':
                    customStyle.fontStyle = 'italic'
                    break;
                    default:
                      // code block
                    }  
             })

        return  customStyle.href ? <Link href={customStyle.href} style={customStyle} target='_blank'>{data.text}</Link> 
         :(
         //<span style={customStyle}>{data.text}</span>

         data.text.split(' ').map((d,i)=><span style={customStyle} key={i} className='complexWord'>{d +' '}</span>)
         )
       // return <span style={customStyle}>{data.text}</span>
    }

    //control mark defs
    //console.log(data)

    return (
      <div className='complex-text'>

        {data && data.map((p,i)=>{
          const markDefs = p.markDefs && p.markDefs //markDefs[0]._key && .href &&._type
            //const list = p.listItem && p.listItem;
            
            if(p.listItem){
              return( 
                <ul key={i} style={{listStyle:"inside"}}>
                {p.children.map((t,i)=>{
                  return <li style={{listStyle:"inside"}} key={i}><Span data= {t}  defs={markDefs}/> </li>
                })}
            </ul> 
            )
          }else{

            return(

              <p key={i}>
            {p.children.map((t,i)=>{
                return <Span data= {t} key={i} defs={markDefs}/>
              })}
            </p> 
            )
          }
        })}    
    </div>
  )
}

export default ComplexText