import fs from 'fs';
import { vehiclesModel } from '../models/vehicles.js';
import { cartsModel } from '../models/carts.js';
//import {run, uri, client} from '../../../mongodb.js'

const id = 0
let products = []
let carts = []
let productsFiltered = []
//let path = "./productManager/dao/fs/products/data.json" //ruta de archivo JSON para ser usado como variable
//let cartPath = "./productManager/dao/fs/carts/carts.json"
let message

export class Product {
    //Constructor eliminado 
    async findProducts() {
            try {
                return await vehiclesModel.find().lean() //elimitated populate for easier queries .populate('carts.cart')
            } catch (error) {
                console.error(error);
                return [];
            }
        } 
    async searchProduct(params) {
        try {
            return await vehiclesModel.find(params)
        } catch (error) {
            console.error(error);
            return [];
        }
    } 
     
    //Method to print current objects in console
    async getProducts() {
        try {
            return await this.findProducts()
        } catch (error) {
            console.error(error);
            return [];
        }
    } 

    async searchProducts(params){
        try{
            return await vehiclesModel.find(params)
        } catch (error) {
            console.error(error);
            return [];
        }        
    }

   async addProduct(productData) {
        try {
            return await vehiclesModel.create(productData);
        } catch (err) {
            console.error(err)
            return []
        }
   }
    //Actualizacion de producto, busqueda por Code
    async updateProduct(id, product) {
        try {
            return await vehiclesModel.updateOne({_id: id}, {$set: product});
        } catch (err) {
            console.error(err)
            return []
        }  
    } 
    //Encuentra producto por ID
    async getProductById(id) {
        try {
            return await vehiclesModel.findOne({_id: id}).lean()              
        } catch (err) {
            console.error(err)
            return []
        }  
    } 
    //Elminia producto por ID
    async deleteProductById(id) {
        try {
            return await vehiclesModel.deleteOne({_id: id});
        } catch (err) {
            console.error(err)
            return []
        }  
    }
    //Elimina todos los productos
    async deleteAll(secretCode) {
        if(secretCode === 'destroy'){
            console.log("bye bye")
            message = `Documentos borrados`
            return message
        }
    }
 }

/////////////////-----------------------------------CARTS------------------------------///////////////////////////////

export class Cart {
    constructor (id, productArr) {
        this.productClass = new Product()
 
    }
    //To distribute current objects to class methods *will NOT print in console*. Will also parse JSON  
    async findCartProducts() {
        try {
            return await cartsModel.find().lean()
        } catch (error) {
            console.error(error);
            return [];
        }
    } 

    //Method to print current objects in console
    async getCarts() {
        try {
            return await this.findCartProducts()
        } catch (error) {
            console.error(error);
            return [];
        }
    } 

    async createCart() {
        try {
            return await cartsModel.create({"products": []})
        } catch (error) {
            console.error(error);
            return [];
        }
    }

   async updateCart(cartId, cart) {
         try {
            return cartsModel.updateOne({_id:cartId}, cart)
        } catch (err) {
            console.error(err)
            return []
        } 
   }

    //Encuentra producto por ID
    async getCartById(id) {
        try {
            return cartsModel.findOne({_id:id}).lean()
        } catch (err) {
            console.error(err)
            return []
        }  
    } 
    //Elminia producto por ID
    async deleteCartById(id) {
        try {
            return cartsModel.deleteOne({_id:id})
        } catch (err) {
            console.error(err)
            return []
        }  
    }
    //Elimina todos los productos
    async deleteAll() {
        const carts = await this.findCartProducts()
        console.log("Products Deleted:", carts)
        const newArr = []
        await fs.promises.writeFile(cartPath, JSON.stringify(newArr, null, "\t"))

    }
 }

export default { Product, Cart }