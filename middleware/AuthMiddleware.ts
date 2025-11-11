import { NextFunction,Response,Request } from "express";
import { response } from "../utils/responseHandler";
import  jwt from "jsonwebtoken";


declare global {
    namespace Express {
        interface Request{
            id:string
        }
    }
}


const authenticatedUser = async(req:Request,res:Response,Next:NextFunction) => {
    const token =  req.cookies.access_Token;

    if(!token){
        return response(res,401,'User not authenticated, or no token available')
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET as string) as jwt.JwtPayload
        if(!decode){
            return response(res,401,'Not authorized, user not found')
        }
        req.id = decode.userId;
        Next()
    } catch (error) {
        return response(res,401,'Not Authorized, token not valid or expired');
    }
}

export {authenticatedUser}