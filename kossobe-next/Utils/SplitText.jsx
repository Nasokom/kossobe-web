import React, { useState } from 'react'

const SplitText = ({data, time, active, direction}) => {

    const splitWord = data.split(' ')

    const charCountByWord = splitWord.map((word,i) => { 
        return word.split('').length
    })

    const totalChar = charCountByWord.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue})

    const charD = charCountByWord.map((l,i)=>{
        return charCountByWord[i-1] ?  parseInt(l) +  parseInt(charCountByWord[i-1]) :  parseInt(l)
    })

    const actual = charCountByWord.map(function (val) { return this.acc += val; }, { acc: 0 })


    //const length = splitString.length;

    const [count,setCount] = useState(0)
/* 
    console.log('char count by word');
    console.log(charCountByWord)

    console.log('total char')
    console.log(totalChar)

    console.log('map accumulateru')
    console.log(actual)
     */
  
    const delay = time ? (time/5) / length : (3/5)/10
    const duration = time ? time/length : 3 /10

    const Style =(i,j)=> {
        return(
                {

                    animationDelay: `${10*i}ms`,
                    animationDuration:`0.5s`,
                }
        )
    }


    const classN = direction == 'inDown' ? 'splitTextInDown' : 
                direction == 'inUp' ? 'splitTextInUp' : 
                direction == 'outDown' ? 'splitTextOutDown' : 
                direction == 'outUp' ? 'splitTextOutUp' : 
                'splitTextInUp';



  return (
    < div style={{display:'flex', flexWrap:'wrap',justifyContent:'center'}}>

        
        {splitWord.map((word,j)=>{
            const initDelay = actual[j] - word.length
            return (
            <div style={{display:'flex', padding:'0.5em', overflow:'hidden'}} key={j}>
                {word.split('').map((char,i)=>{
                    return <span key={i} style={Style( initDelay+i)} className={classN}>{char}</span>
                })}
            </div>)
        })}
    </div>
  )
}

export default SplitText