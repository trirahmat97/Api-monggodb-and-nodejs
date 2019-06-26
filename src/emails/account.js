const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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';


sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 't.rahmat.aribowo@gmail.com',
        subject: 'test',
        text: `welcome to the app, ${name}. let me know how you get along with the app.`
    });
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 't.rahmat.aribowo@gmail.com',
        subject: 'see yoou',
        text: `see you again, ${name}. thanks.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}

// sgMail.send({
//     to: 't.rahmat.aribowo@gmail.com',
//     from: 't.rahmat.aribowo@gmail.com',
//     subject: 'test',
//     text: 'test nodejs from email'
// }) 