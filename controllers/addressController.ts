import { Request, Response } from "express"
import { response } from "../utils/responseHandler";
import Address from "../models/Address";
import User from "../models/User";

export const createOrUpdateAddressByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.id;
        const { addressLine1, addressLine2, phoneNumber, city, state, pincode, addressId } = req.body;

        if (!userId) {
            return response(res, 400, 'user not found, please provide a valid id')
        }

        if (!addressLine1 || !phoneNumber || !city || !state || !pincode) {
            return response(res, 400, 'please enter all value to create a new address')
        }

        if (addressId) {
            const existingAddress = await Address.findById(addressId);
            if (!existingAddress) {
                return response(res, 400, 'Address not found')
            }
            existingAddress.addressLine1 = addressLine1;
            existingAddress.addressLine2 = addressLine2;
            existingAddress.phoneNumber = phoneNumber;
            existingAddress.city = city;
            existingAddress.state = state;
            existingAddress.pincode = pincode;


            await existingAddress.save();

            return response(res, 200, 'Address updated succesfully', existingAddress)

        } else {
            const newAddress = new Address({
                user: userId,
                addressLine1,
                state,
                city,
                phoneNumber,
                pincode
            })

            await newAddress.save()

            await User.findByIdAndUpdate(
                userId,
                {$push : {addresses: newAddress._id}},
                {new:true}
            )

            return response(res,200,'User Address Created Successfully', newAddress)

        }

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