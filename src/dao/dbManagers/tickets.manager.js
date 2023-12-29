import { ticketsModel } from "./models/tickets.model.js";

export default class Tickets {
    constructor () {
        console.log('Working tickets with db');
    }

    getTickets = async () =>  {
       // pasar de BSON a POJO (Plain Old Javascript Object)
        const tickets = await ticketsModel.find().lean();
        return tickets;
    }

    getTicketById = async (id) =>  {
        // pasar de BSON a POJO (Plain Old Javascript Object)
         const tickets = await ticketsModel.find({_id:id}).lean();
         return tickets;
     }
     
    addTicket = async (ticket) => {
        const result = await ticketsModel.create(ticket);
        return result;
    }

    updateTicket = async (id,ticket) => {
        const result = await ticketsModel.updateOne({_id:id},ticket);
        return result;
    }


    addManyTickets = async(tickets) => {
        const result = await ticketsModel.insertMany(tickets);
        console.log(result);
    }
}