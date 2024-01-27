import React from 'react'
import Styles from '../../styles/module/ui/MailResponse.module.css'
import Link from 'next/link'
const MailResponse = ({state,userLang,toggle}) => {


    const title = {
        success:{
                'fr' : 'Email envoyé avec success',
                'de' : 'E-Mail mit Erfolg gesendet',
                'en' :'Email sent with success'
        },
        error:{
            'fr' : "Oups, échec de l'envoi de l'e-mail",
            'de' : 'Hoppla, E-Mail konnte nicht gesendet werden',
            'en' :'Oops, failed to send email'
        }
    }

    const msg = {
        success:{
            'fr' : 'Email envoyé avec success',
            'de' : 'E-Mail mit Erfolg gesendet',
            'en' :'Email sent with success'
    },
    
    error:{
        'fr' : "Reessaye plus tard ou envoie nous un mail en copiant ou en cliquant sur notre adresse mail",
        'de' : 'Versuchen Sie es später noch einmal oder senden Sie uns eine E-Mail, indem Sie unsere E-Mail-Adresse kopieren oder darauf klicken',
        'en' :'Try again later or send us an email by copying or clicking on our email address'
    }
}

const routingText = {
    keep:{
        'fr' : 'Continue la visite',
        'de' : 'Setzen Sie den Besuch fort',
        'en' :'Continue the visit'
    },
    
    change:{
        'fr' : 'Rester sur cette page',
        'de' : 'E-Mail mit Erfolg gesendet',
        'en' :'Email sent with success'
    }
}

  return (


    <div className={Styles.parent}>

        <h4>{state ? title.success[userLang] : title.error[userLang]}</h4>

            <p>{state ? msg.success[userLang] : msg.error[userLang] } { !state && <a href="mailto:kossobe@gmail.com">kossobe@gmail.com</a>}</p>



            {state ?  

            <Link href={'/'}>
                      <button onClick={()=>toggle(false)}>Ok</button>
            s</Link>
      
            
            
            : <button onClick={()=>toggle(false)}>Ok</button> }


  
    </div>


  )
}

export default MailResponse