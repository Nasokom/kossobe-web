import React from 'react'
import ThemeBtn from '../Ui/ThemeBtn'
import LangueBtn from '../Ui/LangueBtn'
import Link from 'next/link'

const Footer = ({userLang}) => {
  return (
    <footer>
    <div >
      <h4>Site map</h4>
      <p>Pour naviguer facilement sur notre site web</p>

      <span id='line'></span>
      <div className='footer-container'>

        <div className='content-box'>

          <h4>Menu</h4>
          <p>
          {userLang.includes('fr') ? 'Pour naviguer facilement sur notre site web' 
          : userLang.includes('de') ? 'Zur einfachen Navigation auf unserer Website'
          : 'To easily navigate our website' }
          </p>
            <ul className='footer-menu-box'>
              <li><Link href={'/'}>Home</Link></li>
              <li><Link href={'/about'}>About</Link></li>
              <li><Link href={'/services/live'}>Services</Link></li>
              <li><Link href={'/clients'}>Clients</Link></li>
              <li><Link href={'/contact'}>Contact</Link></li>
            </ul>
          </div>

          <div className='content-box'>

            <h4>Policy</h4>
            <p>          
            {userLang.includes('fr') ? 'Retrouver les infos legales' 
            :userLang.includes('de') ? 'Rechtliche Hinweise finden'
            :'Find legal information' }
              </p>
            <ul>
              <li><Link href={'/policy#terms'}>
                {userLang.includes('fr') ? "Conditions d'utilisation"
                :userLang.includes('de') ? 'Nutzungsbedingungen'
                :'Terms of use' }
              </Link></li>
              <li><Link href={'/policy#cookie'}>Cookie</Link></li>
              <li><Link href={'/policy#data'}>
              {userLang.includes('fr') ? "Politique de données"
                :userLang.includes('de') ? 'Datenrichtlinie'
                :'Data policy' }
              </Link></li>
            </ul>
          </div>

        <div className='content-box'>
          <span></span>
          <h4>settings</h4>
          <p>
          {userLang.includes('fr') ? 'Regler vos preferences' 
            :userLang.includes('de') ? 'Legen Sie Ihre Einstellungen fest'
            :'Set your preferences' }
            
            </p>
          <ul>
            <li><ThemeBtn/></li> 
            <li><LangueBtn/></li>
          </ul>
        </div>
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