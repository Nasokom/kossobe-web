import Head from 'next/head'
import React,{useEffect, useState} from 'react'
import axios from "axios";
import {useStateContext} from '../context/StateContext'
import Styles from '../styles/Pages/Contact.module.css'
import {client} from '../Utils/sanityClient'
import MailResponse from '../component/Ui/MailResponse';

const Contact = ({services}) => {


    //get Context
    const {userLang,serviceMsg} = useStateContext();

    //subject 
    const [subjectOpt,setSubjectOpt] = useState([]);

    useEffect(()=>{
      const op =[]
     services.length >1 && services.map((serv)=>{
      serv.services.forEach(elt => {
        op.push(elt.name[userLang])
      });


      op.length > 1 && setSubjectOpt(op)
      })

      console.log(op)
      
    }, [userLang,services])
    console.log(subjectOpt);


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

      {toggleMsg && <MailResponse userLang={userLang} state={success} toggle={setToggleMsg}/>}

      <div className='page-header'>
            <h1 className="page-title">
            {userLang.includes('fr') ? 'Intéressé par nos services ?' 
                :userLang.includes('de')? 'Interessiert an unseren Dienstleistungen?' 
                : 'Interested in our services?'}
            </h1>
            <p> 
            {userLang.includes('fr') ? 'Contactez-nous' : userLang.includes('de')? 'Kontaktieren Sie uns' : 'Contact us'}
            </p>
              
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
                      {subjectOpt.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1)).map((s,i)=>{
                        return <option key={i} value={s}>{s}</option>
                      })}

                    </select>
                    <textarea id="txtid" name="message" placeholder={userLang.includes('fr') ? 'Message' : userLang.includes('de')? 'Nachricht' : 'Message'} rows="10" cols="50" maxLength="1000" required={true} >
                    </textarea>
                    <button id="submit" type='submit' className={Styles.submit} name='submit-btn' 
                    //</form>className={sendingMail&&'sending'}
                    value={userLang.includes('fr') ? 'envoyer0' : userLang.includes('de')? 'schicken' : 'send'} >

                        {userLang.includes('fr') && !sendingMail ? 'envoyer' 
                        : userLang.includes('fr') && sendingMail? 'envoie' 
                        
                        : userLang.includes('de') && !sendingMail ? 'senden' 
                        : userLang.includes('de') && sendingMail ? 'in Arbeit' 
                        
                        : !sendingMail  ? 'send' : 'in progress'}
                      
                      </button>
                </form>

                {/* envoyer / send / senden ou schicken
en-cours / in progress / in Arbeit
envoyé (OK) / sent (OK) / gesendet ou geschickt (OK) */}
            </div>                
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
