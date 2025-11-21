import { Request, Response } from "express"
import { response } from "../utils/responseHandler";
import User from "../models/User";

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;

        if (!userId) {
            return response(res, 400, 'user i is required');
        }

        const {name,email,phoneNumber} = req.body;

        const updateUser = await User.findByIdAndUpdate(userId,
             {name,email,phoneNumber},
            {new:true, runValidators:true},
            ).select("-password -verificationToken -resetPasswordToken -resetPasswordExpires");

            if(!updateUser){
                return response(res,400,'User not found')
            }

            return response(res,200,'User Address Updated Successfully', updateUser)

    } catch (error) {
        console.log(error);
        return response(res,500,'Internal Server Error, please try again');
    }
}


export const getAddressByUserId = async(req:Request, res:Response) => {
    try {
        const userId = req.id;

        if (!userId) {
            return response(res, 400, 'user not found, please provide a valid id')
        }

        const address = await User.findById(userId).populate('addresses')
        if(!address){
            return response(res,404,'User Address Not found')
        }

        return response(res,200,'User address get succesfully', address)
    } catch (error) {
        console.log(error)
        return response(res,500,'Internal Server Error, please try again')
    }
}