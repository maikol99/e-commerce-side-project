import mongoose, {Document} from "mongoose";
import { IAddress } from "./Address";

export interface IOrderItem extends Document{
    product:mongoose.Types.ObjectId;
    quantity:number;
}


export interface IOrder extends Document{
    _id:mongoose.Types.ObjectId;
    user:mongoose.Types.ObjectId;
    items:IOrderItem[];
    totalAmount:number;
    shippingAddress:mongoose.Types.ObjectId | IAddress;
    paymentStatus: 'pending' | 'complete' | 'failed' ;
    paymentMethod: string;
    paymentDetails: {
    }
}