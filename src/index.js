const express = require('express');

const mailSender= require('./config/email-config');

const apiRoutes = require('./routes/index');

const { ServerConfig, Logger } = require('./config/index');

const app = express();

app.use('/api', apiRoutes);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on port: ${ServerConfig.PORT}`);
    try{
        const response= await mailSender.sendMail({
            from: ServerConfig.GMAIL_EMAIL,
            to: ServerConfig.GMAIL_RECIPIENT,
            subject: 'Hello, this is a mail from nodemailer',
            text: 'Congratulations! You have successfully set up Nodemailer. '
        })
        console.log(response);
    }
    catch(error){
        console.log(error);
    }
});