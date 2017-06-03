
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);


const APP_NAME = 'Dev-Experts-Hub';

exports.sendMail = functions.database.ref('/Requests')
  .onWrite(event => {
  var data = event.data;
  return sendEmail(data);
});

function sendEmail(data) {
  const mailOptions = {
    from: '"Dev Expert Hub" <noreply@dev-expert-hub.firebaseapp.com>',
    to: 'jen.looper@progress.com'
  };
  mailOptions.subject = `New Dev Expert Request!`;
  mailOptions.text = `A new request was just posted to the Dev Experts Hub `+JSON.stringify(data);
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Alert email sent');
  });
}