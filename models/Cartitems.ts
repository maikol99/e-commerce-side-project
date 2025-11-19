import mongoose, {Document, Schema} from "mongoose";



export interface ICartItem extends Document {
    product:mongoose.Types.ObjectId;
    quantity:Number;
}



export interface ICart extends Document {
    user: mongoose.Types.ObjectId;
    items: ICartItem[];
}

const cartItemSchema = new Schema<ICartItem>({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});


const cartSchema = new Schema<ICart>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true},
        items:[cartItemSchema]
},{timestamps:true})


export default mongoose.model<ICart>('Cart', cartSchema)