import { NextFunction, Response, Request } from "express";
import { response } from "../utils/responseHandler";
import jwt from "jsonwebtoken";

// Extender el tipo Request de Express
declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}

const authenticatedUser = async (
    req: Request,
    res: Response,
    next: NextFunction // ✅ CAMBIO 1: minúscula (antes era "Next")
) => {
    const token = req.cookies.access;

    if (!token) {
        return response(res, 401, "User not authenticated, or no token available");
    }

    try {
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as jwt.JwtPayload;

        if (!decode || !decode.userId) {
            return response(res, 401, "Not authorized, invalid token");
        }

        // ✅ CAMBIO 2: Usamos "userId" porque así lo genera generateToken
        req.id = decode.userId;

        next(); // ✅ CAMBIO 3: minúscula (antes era "Next()")
    } catch (error) {
        console.error("Token verification error:", error);
        return response(res, 401, "Not Authorized, token not valid or expired");
    }
};

export { authenticatedUser };