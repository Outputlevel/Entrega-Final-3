import {Product as ProductDAO} from '../dao/mongo/classes/index.js'
const id = 0
let products = []
let carts = []
let productsFiltered = []
let message

let productClass = new ProductDAO()
export class Product {
    //Constructor eliminado 
    async findProducts() {
            try {
                const getArr = await vehiclesModel.find().lean() //elimitated populate for easier queries .populate('carts.cart')
                return getArr; //Parse objects
            } catch (error) {
                console.error(error);
                return [];
            }
        } 
     
    //Method to print current objects in console
    async getProducts() {
        try {
            const getArr = await productClass.findProducts()
            return getArr
        } catch (error) {
            console.error(error);
            return [];
        }
    } 

    async searchProducts(params){
        try{
            for(let item of Object.keys(params)) {
                params[item] = {$regex: new RegExp(params[item], 'i')} // i for case insensitive, object value to retrieve object value from params, added regex for aproximation
            }
            console.log("params",params)
            return await productClass.searchProduct(params)
        } catch (error) {
            console.error(error);
            return [];
        }
        
    }

   async addProduct(productData) {
        try {
            return await productClass.addProduct(productData) 
        } catch (err) {
            console.error(err)
            return []
        }
   }
    //Actualizacion de producto, busqueda por Code
    async updateProduct(id, product) {
        try {    
            return await productClass.updateProduct(id, product)           
        } catch (err) {
            console.error(err)
            return []
        }  
    } 
    //Encuentra producto por ID
    async getProductById(id) {
        try {
            return await productClass.getProductById(id)  
        } catch (err) {
            console.error(err)
            return []
        }  
    } 
    //Elminia producto por ID
    async deleteProductById(id) {
        try {
            return await productClass.deleteProductById(id) 
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
 export default { Product }