import mongoose from "mongoose";


const connectDb = async () : Promise<void> => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI as string)
        console.log(`mongoDB connection success ${connection.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDb;