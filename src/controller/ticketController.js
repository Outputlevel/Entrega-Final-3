import moment from 'moment';

import {TicketService as Ticket} from '../sevices/ticketService.js'
import {TicketDTO} from '../dao/dto/ticketDTO.js'
import { UserService } from '../sevices/userService.js'
import { Cart } from '../sevices/cartService.js'
import { Product } from '../sevices/productService.js'
import {Response} from '../routes/response.js'

const ticketService = new Ticket()
const US = new UserService()
const CS = new Cart()
const PS = new Product()
const code = 201

export const getTickets = async (req , res) => {
    const tickets = await ticketService.find()
    if(!tickets){
        return res.status(404).send("No hay tickets");
    }
    const response = new Response(code, "success", tickets )
    return res.status(code).send(response);
}

export const createTicket = async (req , res) => {
    const idParam = req.params.uid;
    const ticket = new TicketDTO(req.body)
    //get user and cart
    const user = await US.findUser(idParam)
    const cart = await CS.getCartById(user.cart)
    const product = await PS.getProductById(ticket.products)
    ticket.purchaser = user.email
    const cartFiltered = cart.products.find(p=>p.productId == ticket.products)
    ticket.products = cartFiltered
    ticket.amount = product.price * cartFiltered.quantity
    //Si req.body.products viene vacio, mandar todo el carrito a este array. Si no viene vacio es porque solo se esta comprando un producto
    if(!ticket.products){
        ticket.products = cart.products
    }
    console.log(ticket)
    //calcular precio
    
    //call service
    const newTicket = await ticketService.create(ticket); 
    // await ticketService.create(ticket);
    if(!newTicket){
        return res.status(404).send("Compra fallida");
    }
    await CS.updateCart(user.cart, ticket.products.productId, 0)
    //not used
    /* const cartUpdated = ticket.products.forEach( async (product, i) => {
         //const test = await PS.getProductById(product.productId)
         const qty = ticket.products[i].quantity - ticket.products[i].quantity
         console.log('test', qty)
        await CS.updateCart(cart._id, cart.products[i].productId, qty)
    }) */
    //let user = await US.findUser(idParam)
    const response = new Response(code, "success", newTicket )
    return res.status(code).send(response);
}