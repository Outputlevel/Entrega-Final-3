import {Cart as CartDAO, Product as ProductDAO} from '../dao/mongo/classes/index.js'
import { cartsModel } from '../dao/mongo/models/carts.js'

const id = 0
let products = []
let carts = []
let productsFiltered = []
let message

let cartClass = new CartDAO()

export class Cart {
    constructor (id, productArr) {
        this.productClass = new ProductDAO()
 
    }

    //To distribute current objects to class methods *will NOT print in console*. Will also parse JSON  
    async findCartProducts() {
        try {
            return await cartClass.getCarts()
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
            return await cartClass.createCart()
        } catch (error) {
            console.error(error);
            return [];
        }
    }

   async addToCart(cartId, productId) {
         try {
            //encuentra Carrito y producto por ID
            const getCart =  await cartClass.getCartById(cartId)
            const productArr = await this.productClass.getProductById(productId)
            if(!getCart || !productArr){
                return null
            }
            const cartQty = getCart.products.find( e => e.productId == productArr._id)
            if(!cartQty){
                getCart.products.push({productId: productArr._id, quantity: 1})
                return await cartClass.updateCart(cartId, getCart)
            }
            const newArr = getCart.products.filter( e => e.productId != productArr._id) 
            //Empuja el array nueva cantitad del producto
            newArr.push({productId: cartQty.productId, quantity: cartQty.quantity + 1, _id: cartQty.id })           
            getCart.products = newArr
            return await cartClass.updateCart(cartId, getCart)
        } catch (err) {
            console.error(err)
            return []
        } 
   }
   //actualiza carrito con nueva cantidad de producto
   async updateCart(cid, pid, quantity) {
        try{
            const getCart =  await cartClass.getCartById(cid)
            const productArr = await this.productClass.getProductById(pid)
            if(!getCart || !productArr){
                return null
            }
            const newArr = getCart.products.filter( e => e.productId != productArr._id)
            console.log(newArr)
            if(quantity === 0){
                //remueve producto del carrito      
                return await cartsModel.updateMany({_id:cid}, {$pull: {products: {productId:productArr._id}}})
            }
            //Empuja el array nueva cantitad del producto
            const productUpdated = getCart.products.find( e => e.productId == productArr._id)
            productUpdated.quantity = quantity
            newArr.push(productUpdated)           
            getCart.products = newArr
            return await cartClass.updateCart(cid, getCart)
        }catch (err) {
            console.error(err)
            return []
        }
    }

    //Encuentra producto por ID
    async getCartById(id) {
        try {
            return await cartClass.getCartById(id)
        } catch (err) {
            console.error(err)
            return []
        }  
    } 
    //Elminia producto por ID
    async deleteCartById(id) {
        try {
            return await cartClass.deleteCartById(id)
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

export default { Cart }