import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"; 
import passport from "passport";
import connectDb from "./config/dbConnect";
import authRoutes from "./routes/authRouter";
import productRoutes from "./routes/productRoute";
import cartRoutes from "./routes/cartRoute";
import wishListRoutes from './routes/wishlistRouter'
import addressRoutes from "./routes/addressRoute";
import userRoutes from "./routes/userRoute";
import orderRoutes from "./routes/orderRouter";

// Importar la estrategia de Google para que se registre en passport
import "./controllers/strategy/googleStrategy";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "http://localhost:3001",
].filter(Boolean) as string[];

const corsOption = {
  origin: allowedOrigins,
  credentials: true, 
};

app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.json()); 
app.use(cookieParser()); 
app.use(passport.initialize());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Conectar a la base de datos
connectDb();

// API endpoints
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/user/address", addressRoutes);
app.use("/api/user", userRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
