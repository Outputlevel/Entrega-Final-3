import ticketModel from "../models/tickets.js"

export class Ticket {
    async find(ticket) {
            try {
                return await ticketModel.find({_id:ticket.id}).lean(); 
            } catch (error) {
                console.error(error);
                return [];
            }
    }
    
    async create(ticket) {
        try {
            return await ticketModel.create(ticket); 
        } catch (error) {
            console.error(error);
            return [];
        }
    } 
}
