import  express  from "express";
import { authenticatedUser } from "../middleware/AuthMiddleware";
import * as AddressController from '../controllers/addressController';

const router = express.Router()


//Rutas de los productos
router.post('/create-or-update', authenticatedUser,AddressController.createOrUpdateAddressByUserId)
router.get('/', authenticatedUser, AddressController.getAddressByUserId)

export default router;