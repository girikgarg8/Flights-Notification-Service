We will be using NodeMailer package in order to send the email. 

We create a transport object in the email-config and use it to send the emails.

We install RabbitMQ on our local and install amqplib (NodeJS client for RabbitMQ). We create channel using the amqplib. Now aht is a channel? 

From the documentation, 

" Some applications need multiple logical connections to the broker. However, it is undesirable to keep many TCP connections open at the same time because doing so consumes system resources and makes it more difficult to configure firewalls. AMQP 0-9-1 connections are multiplexed with channels that can be thought of as lightweight connections that share a single TCP connection. "

As RabbitMQ uses AMQP which is a TCP based protocol, the producer needs to send an acknowledgment for every message received from the consumer.