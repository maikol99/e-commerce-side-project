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

router.get('/google', (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        return res.status(503).json({
            success: false,
            message: "Google OAuth no está configurado en el servidor. Agregá GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET en el archivo .env del backend.",
        });
    }
    passport.authenticate('google', {
        scope: ["profile", "email"]
    })(req, res, next);
});

// google Callback route
router.get(
    '/google/callback',
    (req: Request, res: Response, next: NextFunction) => {
        if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
            return res.redirect(`${process.env.FRONTEND_URL}?error=google_not_configured`);
        }
        passport.authenticate("google", {
            failureRedirect: `${process.env.FRONTEND_URL}?error=google_failed`,
            session: false,
        })(req, res, next);
    },
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = req.user as IUSER;
            const accessToken = generateToken(user);
            res.cookie('access', accessToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'lax',
            });

            res.redirect(`${process.env.FRONTEND_URL}`);
        } catch (error) {
            next(error);
        }
    }
);


export default router;
