import { Request, Response } from "express";
import User from "../models/User";
import { response } from "../utils/responseHandler";
import crypto from "crypto";
import { sendResetPasswordLinkToEmail } from "../config/emailConfig";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, agreeTerms } = req.body;

    // Validaciones básicas
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

     // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response(res, 400, "User already exists");
    }

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const user = new User({
      name,
      email,
      password,
      agreeTerms,
      verificationToken,
    });
    await user.save();

    
    const result = await sendResetPasswordLinkToEmail(user.email,verificationToken)
    console.log(result)
    return response(res,200,"User registration successfull, please check your email box to verify your account");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal Server Error, please try again");
  }
};
