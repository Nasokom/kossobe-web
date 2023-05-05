import React from 'react'

const ComplexText = ({data}) => {

//This Component render one paragraphe "<p/>", with multiple span inside for the style 

    const Span = ({data}) =>{
        const customStyle = {
        }

      data.marks &&  data.marks.forEach((d)=>{
            switch(d) {
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

        return <span style={customStyle}>{data.text}</span>
    }

  return (
    <div className='text-container'>
        {data.map((p,i)=>{
            return( 
            <p key={i}>
                {p.children.map((t,i)=>{
                    return <Span data= {t} key={i}/>
                })}
                
            </p>)
        })}    
    </div>
  )
}

export default ComplexText