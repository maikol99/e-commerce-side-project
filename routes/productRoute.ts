import  express  from "express";
import { authenticatedUser } from "../middleware/AuthMiddleware";
import { multerMiddleware } from "../config/cloudinaryConfig";
import * as ProductController from '../controllers/productController'

const router = express.Router()


//Rutas de los productos
router.post('/', authenticatedUser, multerMiddleware, ProductController.createProduct)
router.get('/', authenticatedUser, ProductController.getAllProducts)
router.get('/:id', authenticatedUser,ProductController.getProductById)
router.delete('/seller/:productId', authenticatedUser, ProductController.deleteProduct)
router.get('/seller/:sellerId',authenticatedUser,ProductController.getProductBySellerId)

export default router;