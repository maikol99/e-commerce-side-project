import  express  from "express";
import { authenticatedUser } from "../middleware/AuthMiddleware";
import * as CartController from '../controllers/cartControllers';

const router = express.Router()


//Rutas de los productos
router.post('/add', authenticatedUser,CartController.addToCart)
router.delete('/remove/:productId', authenticatedUser, CartController.removeFromCart)
router.get('/:userId',authenticatedUser,CartController.getCartByUser)

export default router;