function sendEmail(recipient, subject, body) {
  Email.send({
    Host: 'smtp.gmail.com',
    Username: 'hermesalerting@gmail.com',
    Password: 'Codesmith1',
    To: recipient,
    From: 'hermesalerting@gmail.com',
    Subject: subject,
    Body: body,
  });
}
export default sendEmail;
