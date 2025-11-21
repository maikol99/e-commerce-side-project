import { NextFunction, Router } from "express";
import * as authContoller from '../controllers/authController'
import { authenticatedUser } from "../middleware/AuthMiddleware";
import passport from 'passport'
import { response} from "express";
import { Request, Response } from "express";
import { IUSER } from "../models/User";
import { generateKey } from "crypto";
import { generateToken } from "../utils/generateToken";



const router = Router();


router.post('/register', authContoller.register)
router.post('/login', authContoller.login)
router.get('/verify-email/:token', authContoller.verifyEmail)
router.post('/forgot-password', authContoller.forgotPassword)
router.post('/reset-password/:token', authContoller.resetPassword)
router.get('/logout', authContoller.logout)

router.get('/verify-auth', authenticatedUser, authContoller.checkUserAuth)

router.get('/auth/google',passport.authenticate('google', {
    scope: ["profile", "email"]
}))

//google Callback route

router.get(
    '/auth/google/callback',
    passport.authenticate("google", {
      failureRedirect: `${process.env.FRONTEND_URL}`,
      session: false, // si NO usás sesiones
    }),

    async(req:Request, res:Response, next:NextFunction) :  Promise<void> => {
        try {
            const user = req.user as IUSER;
            const accessToken = await generateToken(user)
            res.cookie('access_token', accessToken, {
                httpOnly:true,
                maxAge: 24 * 60 * 60 * 1000
            })

            res.redirect(`${process.env.FRONTEND_URL}`)
        } catch (error) {
            next(error)
        }
    } 
)


export default router;
