import nodemailer from "nodemailer";
//const fs =  require('fs-extra')

export default async function sendEmail(req, res) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_KEY_PASS
    },
  });

  const { name, email, message,phone } = req.body;

  /* const templateFile = await fs.readFile('public/mailTemplate/emailClient.html', 'utf-8');

  const emailHtml = templateFile
                    .replace('{name}',name)
 */


  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: `${email}`,
    subject: "Salut c'est kossobe",
    text: 'Merci pour la venu sur mon site web',
    //html : emailHtml,
    text : `
    Bonjour ${name}
    Test message de kossobe

    (Ceci est un mail automatique suite à la soumission du formulaire de contact de kossobe)

    Votre message :
    ${message}
    `

  };

  const mailOptions2 = {
  from: email,
  to: process.env.GMAIL_USER,
  subject: `${name} vous a envoyé un message depuis votre siteweb`,
  text: 
  `Bonjour admin kossobe,
  
   Vous avez recu un mail de ${name} depuis le site web kossobe :
   
   voici son message:
    
   ${message}

   voici son mail pour le contacter: ${email}
   ${phone && `Voici son numero de telephone pour le contacter : ${phone}` }
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
