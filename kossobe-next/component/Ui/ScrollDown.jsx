import React from 'react'
import { useStateContext } from '../../context/StateContext'
import Styles from '../../styles/module/ui/ScrollDown.module.css'
import {FaArrowDown} from 'react-icons/fa'

const ScrollDown = () => {

    const {userLang} = useStateContext()

  return (

    <div className={`scrollDownArrow ${Styles.parent}`}>
        <div className={Styles.arrow}><FaArrowDown/></div>
    <div className={Styles.circle}>
    <svg viewBox="0 0 200 200">
      <path id="textPath" d="M 85,0 A 85,85 0 0 1 -85,0 A 85,85 0 0 1 85,0" transform="translate(100,100)" fill="none" strokeWidth="0"></path>
      <g>
        <text textAnchor="start">
          <textPath xlinkHref="#textPath" startOffset="0%"  fill="black"style={{/* textShadow:`0.1em 0.1em 1px white` */}}> - &nbsp; Scroll Down &nbsp; - &nbsp; Scroll Down &nbsp; - &nbsp; Scroll Down </textPath>
        </text>
      </g>
    </svg>
    </div>
  </div>

  )
}

export default ScrollDown