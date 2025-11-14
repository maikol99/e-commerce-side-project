import  express  from "express";
import { authenticatedUser } from "../middleware/AuthMiddleware";
import { multerMiddleware } from "../config/cloudinaryConfig";
import * as ProductController from '../controllers/ProductController'

const router = express.Router()


router.post('/', authenticatedUser, multerMiddleware, ProductController.createProduct)

export default router;