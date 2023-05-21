import Head from 'next/head'
import React,{useEffect, useState} from 'react'
import axios from "axios";
import {useStateContext} from '../context/StateContext'
import Styles from '../styles/Pages/Contact.module.css'
import {client} from '../Utils/sanityClient'

const Contact = ({services}) => {

    //subject 
    const [subjectOpt,setSubjectOpt] = useState([]);

   //console.log(services)
    useEffect(()=>{
      const op =[]
     services.length >1 && services.map((serv)=>{
      serv.services.forEach(elt => {
        op.push(elt.name)
      });


      op.length > 1 && setSubjectOpt(op)
      })

      console.log(op)
      
    }, [])
    console.log(subjectOpt);

    //get Context
    const {userLang,serviceMsg} = useStateContext();

    //Mail State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [phone,setPhone] = useState("")
    
    // Ux Mail progree
    const [success, setSuccess] = useState(null);
    const [toggleMsg, setToggleMsg]= useState(false);
    const [sendingMail, setSendingMail] = useState(false);
    //Gerer les erreur de saisie 

    const editValue = (e) =>{
        const form = e.target.form; 
        setName(form[0].value)
        setEmail(form[1].value)
        setPhone(form[2].value)
        setSubject(form[3].value)
        setMessage(form[4].value)

    }   



    const handleSubmit = async (event) => {
        event.preventDefault();
      setSendingMail(true)
        
        //send the mail
        try {
          const response = await axios.post("/api/sendMail", {
              name,
            email,
            phone,
            subject,
            message,
            userLang,
            userLang

        });
            
          //setSuccess(response.data.message);
          setToggleMsg(true)
          setSuccess(true)
          setSendingMail(false)
          
        } catch (error) {
            setSendingMail(false)
            setToggleMsg(true)
            setSuccess(false)
          console.log(error)
        }

        //Clean input
            setTimeout(()=>{
                const form = event.target;
                success && 
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                    setError("");
                    form[0].value = ""
                    form[1].value = ""
                    form[2].value = ""
                    form[4].value = ""
            },1000)

      };
    


  return (
    <>
    <Head>
        <title>Contact</title>
        <meta name="description" content="Contact kossobe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="all" />
        <meta name="author" content="kossobe"/>
        <meta name="publisher" content="Kossobe"/>
        <meta name="copyright" content="Kossobe"/>
        <meta name="page-topic" content="Kossobe"></meta>
    </Head>
    <div className={Styles.page}>
      <div className='page-header'>
            <h1 className="page-title">
            {userLang.includes('fr') ? 'contact' : userLang.includes('de')? 'Kontakt' : 'contact'}
              </h1>
              <p>Prenez contact avec nous</p>
              <p> {userLang.includes('fr') ? 'Intéressé par nos services ?' 
                  :userLang.includes('de')? 'Interessiert an unseren Dienstleistungen?' 
                  : 'Interested in our services?'}</p>
              
      </div>

  
    {/* <h3>Vous souhaitez collaborer avec moi, discuter musique ou simplement dire bonjour ? N'hésitez pas à utiliser le formulaire ci-dessous pour entrer en contact !</h3> */}
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <div>
                <form id='contact-form' onSubmit={(e)=>handleSubmit(e)} onChange={(e)=>editValue(e)}>
                    <input type="text" name='nom' placeholder={userLang.includes('fr') ? 'Nom' : userLang.includes('de')? 'Name' : 'nom'} required={true} />
                    <input type='email' name='mail' placeholder='Email' required={true} />
                    <input type='tel' name="tel" placeholder='Phone' />

                    <select name='subject'>
                      <option value={serviceMsg ? serviceMsg['fr'] : ''}>{serviceMsg ? serviceMsg[userLang] : (userLang.includes('fr') ? 'Sujet' : userLang.includes('de')? 'Thema' : 'Subject')}</option>
                      {subjectOpt.map((s,i)=>{
                        return <option key={i} value={s['fr']}>{s[userLang]}</option>
                      })}

                    </select>
                    <textarea id="txtid" name="message" placeholder={userLang.includes('fr') ? 'Message' : userLang.includes('de')? 'Nachricht' : 'Message'} rows="10" cols="50" maxLength="1000" required={true} >
                    </textarea>
                    <button id="submit" type='submit' className={Styles.submit} name='submit-btn' 
                    //</form>className={sendingMail&&'sending'}
                    value={userLang.includes('fr') ? 'envoyer' : userLang.includes('de')? 'schicken' : 'send'} >

                        {userLang.includes('fr') && !sendingMail ? 'envoyer' 
                        : userLang.includes('fr') && sendingMail? 'envoie' 
                        
                        : userLang.includes('de') && !sendingMail ? 'schicken' 
                        : userLang.includes('de') && sendingMail ? 'schick' 
                        
                        : !sendingMail  ? 'send' : 'sending'}
                      
                      </button>
                </form>
            </div>


                {/* {toggleMsg && <MailResponse success={success} closeMsg={setToggleMsg}/>} */}


                
    </div>
</>
  )
}

export default Contact

export async function getStaticProps() {

  //const aboutData = await client.fetch(`*[_type == "contenu"]`);
  const services = await client.fetch(`*[_type == "service"]`);
  return {
    props: {
     // aboutData,
      services
    },
    revalidate: 1,
  };
}
