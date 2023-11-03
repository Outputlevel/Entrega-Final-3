import { Router } from "express";
import {getTickets, createTicket} from '../../controller/ticketController.js'

const router = Router()


///-----------------------------TICKET-----------------------------////

router.get('/', getTickets);
router.post('/create/:uid', createTicket);

export default router;