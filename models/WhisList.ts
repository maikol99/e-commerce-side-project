import mongoose, { Document, Schema } from "mongoose";


export interface IWhisList extends Document {
    user: mongoose.Types.ObjectId;
    products: mongoose.Types.ObjectId[];
}



const whisListSchema = new Schema<IWhisList>({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
},{timestamps:true});


export default mongoose.model<IWhisList>('WhisList', whisListSchema)