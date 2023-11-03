import mongoose from "mongoose"

const cartsCollection = 'tickets'

const cartsSchema = new mongoose.Schema({
    code: {
        type:String,
        unique:true 
    },
    purchase_datetime:{
        type:String,
        unique:false 
    },
    amount: {
        type:Number,
        unique:false 
    },
    purchaser: {
        type: String
    },
    products: []
})

const ticketModel = mongoose.model(cartsCollection, cartsSchema)

export default ticketModel;
