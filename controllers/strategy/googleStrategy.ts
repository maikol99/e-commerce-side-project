import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User, { IUSER } from '../../models/User';
import { Request } from 'express';

dotenv.config();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8080/api/auth/google/callback';

if (googleClientId && googleClientSecret) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: googleClientId,
                clientSecret: googleClientSecret,
                callbackURL: googleCallbackUrl,
                passReqToCallback: true,
            },
            async (
                req: Request,
                accessToken,
                refreshToken,
                profile,
                done: (error: any, user?: IUSER | false) => void
            ) => {
                const { emails, displayName, photos } = profile;
                try {
                    let user = await User.findOne({ email: emails?.[0]?.value });
                    if (user) {
                        if (!user.profilePicture && photos?.[0]?.value) {
                            user.profilePicture = photos?.[0]?.value;
                            await user.save();
                        }
                        return done(null, user);
                    }

                    user = await User.create({
                        googleId: profile.id,
                        name: displayName,
                        email: emails?.[0]?.value,
                        profilePicture: photos?.[0]?.value,
                        isVerified: true,
                        agreeTerms: true,
                    });

                    done(null, user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
    console.log(" Google OAuth configurado correctamente");
} else {
    console.warn("⚠️ Google OAuth no inicializado: faltan GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET en .env");
}
