import nodemailer from 'nodemailer';

const mailSender = (to, text, subject) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'saik.fsk@gmail.com',
        pass: 'MadDog1905'
      }
    });
    const mailOpts = {
      from: 'Diary',
      to: to,
      subject: subject,
      text: text
    }
    transporter.sendMail(mailOpts, (err, info) => {
      if (err) reject(err);
      else {
        console.log(`Email sent ${info.response}`);
        resolve(info.response);
      }
    });
  });
}

export default mailSender;