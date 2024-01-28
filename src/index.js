const express = require('express');
const amqplib = require('amqplib');
const { EmailService } = require('./services');
const apiRoutes = require('./routes/index');
const { ServerConfig, Logger } = require('./config/index');
const app = express();

async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertQueue("Notification-Queue");
        channel.consume("Notification-Queue", async (data) => {
            console.log(`${Buffer.from(data.content)}`);
            const emailObject = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendMail(ServerConfig.GMAIL_EMAIL, emailObject.recipientEmail, emailObject.subject, emailObject.text);
            channel.ack(data);
        })
    }
    catch (error) {
        throw error;
    }
}


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);


app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on port: ${ServerConfig.PORT}`);
    await connectQueue();
    console.log("Queue is connected")
});