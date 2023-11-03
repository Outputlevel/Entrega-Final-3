import {Ticket} from "../dao/mongo/classes/ticketDAO.js"

const ticketDao = new Ticket()

export class TicketService {
    async find(ticket) {
        try {
            return await ticketModel.find(ticket); 
        } catch (error) {
            console.error(error);
            return [];
        }
}
    
    async create(ticket) {
            try {
                return await ticketDao.create(ticket);
            } catch (error) {
                console.error(error);
                return [];
            }
    } 
}
