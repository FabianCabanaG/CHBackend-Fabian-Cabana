import { __dirname } from '../utils.js';
import TicketsManager from '../dao/dbManagers/tickets.manager.js';

const manager = new TicketsManager();


const getTicketService = async () => {
    const tickets = await manager.getTickets();
    return tickets
};


const addTicketService  = async (user,amount) => {
    const newTicket = {
        code:Date.now()+ Math.floor(Math.random()*100000+1),
        purchase_datetime: new Date().toLocaleString,
        amount,
        purchaser:user.email
    }

    const result = await manager.addTicket(newTicket)
    return (result)
}

const getTicketByIdService = async (ticket_id) => {
    const tickets = await manager.getTicketById(ticket_id);
    return tickets;
};

const updateTicketService =  async (newTicket,ticket_id) => {

    if(!newTicket){
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }

    await manager.updateTicket(ticket_id,newTicket)
    const tickets = await manager.getTicketById(ticket_id);
    return tickets

};

const addManyTicketsService =  async (newTickets) => {

await manager.addManyTickets(newTickets)

return newTickets

}

export {
 getTicketService
,addTicketService
,getTicketByIdService
,updateTicketService
,addManyTicketsService
}