import  express  from "express";
import { authenticatedUser } from "../middleware/AuthMiddleware";
import * as WhisListController from '../controllers/wishListController';

const router = express.Router()


//Rutas de los productos
router.post('/add', authenticatedUser,WhisListController.addToWishList)
router.delete('/remove/:productId', authenticatedUser, WhisListController.removeFromWishlist)
router.get('/:userId',authenticatedUser,WhisListController.getwishListByUser)

export default router;