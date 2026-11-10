import  express  from "express";
import { authenticatedUser } from "../middleware/AuthMiddleware";
import { multerMiddleware } from "../config/cloudinaryConfig";
import * as ProductController from '../controllers/productController'

const router = express.Router()

// Rutas de productos: GET público para el catálogo de la tienda
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)

// Rutas protegidas (crear, eliminar, ver mis ventas)
router.post('/', authenticatedUser, multerMiddleware, ProductController.createProduct)
router.delete('/seller/:productId', authenticatedUser, ProductController.deleteProduct)
router.get('/seller/:sellerId', authenticatedUser, ProductController.getProductBySellerId)

export default router;
