import  express  from "express";
import { authenticatedUser } from "../middleware/AuthMiddleware";
import * as userController from '../controllers/userController';

const router = express.Router()


//Rutas de los productos
router.put('/profile/update/:userId', authenticatedUser,userController.updateUserProfile)


export default router;