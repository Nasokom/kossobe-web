import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

const ComplexText = ({data}) => {

//This Component render one paragraphe "<p/>", with multiple span inside for the style 

 //console.log(data)
//todo 
    const Span = ({data, defs}) =>{
  
      console.log(defs)

      const customStyle = {} //Style
      const [defIndex, setDefIndex] = useState(null) //Store markDefs index
       

      /*   data.marks &&  data.marks.forEach((mark)=>{//Select 1 style
            switch(mark) {
                case 'strong':
                    customStyle.fontWeight = 'bolder'
                  break;
                case 'underline':
                    customStyle.textTransform = 'underline'
                  break;
                  case 'em':
                    customStyle.fontStyle = 'italic'
                  break;
                default:
                  // code block
              }              
            }) */
      

      defs.length >= 1 && defs.forEach((def,i)=>{

        data.marks &&  data.marks.forEach((mark)=>{//Select 1 style

          if(mark == def._key){
            console.log(def._key)
              customStyle.href = def.href
          }
          
          switch(mark) {
            case 'strong':
              customStyle.fontWeight = 'bolder'
              break;
              case 'underline':
                customStyle.textTransform = 'underline'
                break;
                case 'em':
                  customStyle.fontStyle = 'italic'
                  break;
                  default:
                    // code block
                  }              
                })

          })

        return  customStyle.href ? <Link href={customStyle.href} style={customStyle}>{data.text}</Link>  : <span style={customStyle}>{data.text}</span>
       // return <span style={customStyle}>{data.text}</span>
    }

    //control mark defs
    
    return (
      <div className='text-container'>
        {data.map((p,i)=>{

          const markDefs = p.markDefs && p.markDefs //markDefs[0]._key && .href &&._type
            return( 
            <p key={i}>
                {p.children.map((t,i)=>{
                    return <Span data= {t} key={i} defs={markDefs}/>
                })}
                
            </p>)
        })}    
    </div>
  )
}

export default ComplexText