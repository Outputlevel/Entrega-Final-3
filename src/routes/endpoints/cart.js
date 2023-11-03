import { Router } from "express";
import { userAuth } from "../../middlewares/auth.js";
import {getCarts, getCartById, createCart, deleteCart, addToCart, deleteCartById, updateCart, cartUpdated} from '../../controller/cartController.js'

const router = Router()


///-----------------------------CART-----------------------------////

//Trae Todos los carritos
router.get('/', getCarts);

///Trae Carrito por ID
router.get('/:cartId', getCartById);

//Crear Carrito
router.post('/',  userAuth, createCart);

//Elimina carrito por Id
router.delete('/:cartId', deleteCart);

//add to cart
router.post('/:cartId/product/:productId', userAuth, addToCart);

//Delete product from cart
router.delete('/:cartId/product/:productId', userAuth, deleteCartById);

//update quantity 
router.put('/:cartId/product/:productId', userAuth, updateCart);
router.post('/:cartId/product/:productId', userAuth, cartUpdated); //form

export default router