import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"; 
import connectDb from "./config/dbConnect";
import authRoutes from "./routes/authRouter";
import productRoutes from "./routes/productRoute";
import cartRoutes from "./routes/cartRoute";
import wishListRoutes from './routes/wishlistRouter'
import addressRoutes from "./routes/addressRoute";
import userRoutes from "./routes/userRoute";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();


const corsOption = {
  origin: process.env.FRONTEND_URL,
  credentials: true, 
};

app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.json()); 
app.use(cookieParser()); 

// Conectar a la base de datos
connectDb();

// API endpoints
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/user/address", addressRoutes);
app.use("/api/user", userRoutes);



app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});