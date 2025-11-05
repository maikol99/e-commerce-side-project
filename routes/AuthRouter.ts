import { Router } from "express";
import * as authContoller from '../controllers/authController'




const router = Router();


router.post('/register', authContoller.register)
router.post('/login', authContoller.login)
router.get('/verify-email/:token', authContoller.verifyEmail)
router.post('/forgot-password', authContoller.forgotPassword)
router.post('/reset-password/:token', authContoller.resetPassword)


export default router;