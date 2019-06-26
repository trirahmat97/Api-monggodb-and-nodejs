const sgMail = require('@sendgrid/mail');
// const sendgridAPIKey = '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';


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 't.rahmat.aribowo@gmail.com',
        subject: 'cretae app',
        text: `welcome to the app, ${name}. let me know how you get along with the app.`
    });
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 't.rahmat.aribowo@gmail.com',
        subject: 'see yoou again in app',
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