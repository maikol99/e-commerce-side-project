import { Router } from "express";
import * as authContoller from '../controllers/authController'




const router = Router();


router.post('/register', authContoller.register)


export default router;