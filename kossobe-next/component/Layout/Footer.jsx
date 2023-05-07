import React from 'react'
import ThemeBtn from '../Ui/ThemeBtn'
import LangueBtn from '../Ui/LangueBtn'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
    <div >
      <h4>Site map</h4>
      <p>Pour naviguer facilement sur notre site web</p>

      <div>
        <Link href={'/'}>Home</Link>
        <Link href={'/about'}>About</Link>
        <Link href={'/services'}>Ours Services</Link>
        <Link href={'/contact'}>Contact</Link>
      </div>


    </div>
    <div className='settings'>
        <ThemeBtn/>
        <LangueBtn/>
    </div>
    </footer>
  )
}

export default Footer