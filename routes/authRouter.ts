import { Router } from "express";
import * as authContoller from '../controllers/authController'
import { authenticatedUser } from "../middleware/AuthMiddleware";




const router = Router();


router.post('/register', authContoller.register)
router.post('/login', authContoller.login)
router.get('/verify-email/:token', authContoller.verifyEmail)
router.post('/forgot-password', authContoller.forgotPassword)
router.post('/reset-password/:token', authContoller.resetPassword)
router.get('/logout', authContoller.logout)

router.get('/verify-auth', authenticatedUser, authContoller.checkUserAuth)


export default router;
