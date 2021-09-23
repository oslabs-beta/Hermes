function sendEmail(recipient, subject, body) {
  Email.send({
    Host: 'smtp.gmail.com',
    Username: '',
    Password: '',
    To: recipient,
    From: '',
    Subject: subject,
    Body: body,
  });
}
export default sendEmail;
