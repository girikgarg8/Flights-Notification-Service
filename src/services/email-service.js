const { TicketRepository } = require('../repositories');
const { MAILER } = require('../config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const ticketRepository = new TicketRepository();

async function sendMail(mailFrom, mailTo, subject, text) {
    try {
        const response = await MAILER.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

async function createTicket(data) {
    try {
        const response = await ticketRepository.create(data);
        return response;
    }
    catch (error) {
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Ticket object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getPendingEmails() {
    try {
        const response = await ticketRepository.getPendingTickets();
        return response;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    sendMail,
    createTicket,
    getPendingEmails
}