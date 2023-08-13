import nodemailer from "nodemailer";
//const fs =  require('fs-extra')
import ComplexText from "../../component/Ui/ComplexText";
import { client } from "../../Utils/sanityClient";
const ReactDOMServer = require('react-dom/server');
import EmailTemplate from "../../component/mailTemplate/EmailTemplate";


export default async function sendEmail(req, res) {

  const { name, email, message,phone, userLang } = req.body;

  //get sanity mail Data 
  const getMail = await client.fetch("*[_type == 'mail']");
  
  //Pass data to compo
  const ourResponse = getMail.map((mail,i)=>{
    if(mail.name.includes('client')){
      return mail
    }
  });
  
  //Algo remplacer les champs {ww}
  const stringiRes = JSON.stringify(ourResponse[0])

  console.log(stringiRes)//test


   var mapObj = {
    name:name,
    //message:message.replace("\n\n", "$enter$enter").replace("\n", "$enter"),
    phone:phone,
    email:email
 };
 
 console.log('Message simple:')
 console.log(message)
 console.log('modif regex chelou :')
 console.log(message.replace(/\s\s+/g, ' '))
 console.log('message modif retour: ')
 console.log(message.replaceAll("\n", " $enter "))
 console.log('message Double modif:')
 console.log(message.replaceAll("\n", " $enter ").replaceAll(/\s\s+/g, ' '))

 const responseText = stringiRes.replace(/\$(name|email|phone)/gi, function(matched,key){
  return mapObj[key];
});

console.log('Object string Modifier : ')
console.log(responseText)

const finalResp = JSON.parse(responseText);

const emailHtml = ReactDOMServer.renderToStaticMarkup(<EmailTemplate name={name} message={message.replaceAll("\n", " $enter ").replaceAll(/\s\s+/g, ' ')} userLang={userLang} ourResponse={JSON.parse(responseText)}/>);

 const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_KEY_PASS
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: `${email}`,
    subject: finalResp.subject[userLang],
    html : emailHtml
  };

  const mailOptions2 = {
  from: email,
  to: process.env.GMAIL_USER,
  subject: `${name} vous a envoyé un message depuis votre siteweb`,
  text: 
  `Bonjour Marcel,
  
   Vous avez recu un mail de ${name} depuis votre site web :
   
   voici son message:
   ${message}

   voici son mail pour le contacter: ${email}
   ${phone && `Voici son numero de telephone pour le contacter : ${phone}` }

   ps: Cette personne est communique en ${userLang == 'fr' ? 'Francais' : userLang == 'de' ? 'Allemand' : 'Anglais' }
  `
};

try {
  await transporter.sendMail(mailOptions2);
  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: "Emails sent successfully." });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Failed to send emails." });
}
}