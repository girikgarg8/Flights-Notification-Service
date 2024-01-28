const express = require('express');

const mailSender= require('./config/email-config');

const apiRoutes = require('./routes/index');

const { ServerConfig, Logger } = require('./config/index');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);


app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on port: ${ServerConfig.PORT}`);
});