import moment from 'moment';

export class TicketDTO {
    constructor(ticket) {
        this.code = Date.now() + Math.floor(Math.random() * 10000 + 1),
        this.purchase_datetime = this.getDate(), 
        this.amount = ticket.amount ?? 0,
        this.purchaser = ticket.purchaser ?? null,
        this.products =  ticket.products
    }
    getDate(){
        const timestamp =  Date.now()
        return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
    }
}
