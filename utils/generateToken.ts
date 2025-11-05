import jwt from "jsonwebtoken"
import { IUSER } from "../models/User"


export const generateToken =  (user:IUSER) : string => {
    return jwt.sign({userId:user?._id}, process.env.JWT_SECRET as string, {expiresIn:'1d'})
}