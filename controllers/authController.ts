import { Request, Response } from "express";
import User from "../models/User";
import { response } from "../utils/responseHandler";
import crypto from "crypto";
import {
  sendResetPasswordLinkToEmail,
  sendVerificationToEmail,
} from "../config/emailConfig";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, agreeTerms } = req.body;

    // Validaciones básicas
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
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

    // ✅ BIEN - Envuelve en try-catch para capturar errores
    try {
      await sendVerificationToEmail(user.email, verificationToken);
      console.log('✅ Email de verificación enviado a:', user.email);
    } catch (emailError) {
      console.error('❌ Error al enviar email:', emailError);
      // Importante: El usuario ya fue creado, así que no falles la operación
      return response(
        res,
        201,
        "User registered but email could not be sent. Please contact support.",
        { user: { email: user.email } }
      );
    }

    return response(
      res,
      201, // ← Cambié de 200 a 201 (Created)
      "User registration successful, please check your email to verify your account"
    );
  } catch (error) {
    console.error('❌ Error en registro:', error);
    return response(res, 500, "Internal Server Error, please try again");
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const {token} = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return response(res, 400, "invalid or expried verification token");
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    const accessToken = generateToken(user);
    res.cookie("access", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    await user.save();
    return response(
      res,
      200,
      "Email verified succesfully, Now you can use our services"
    );
  } catch (error) {
    console.error('❌ Error en verificación:', error);
    return response(res, 500, "Internal Server Error, please try again");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return response(res, 400, "invalid email or password");
    }

    if (!user.isVerified) {
      return response(
        res,
        400,
        "please verify your email before login in.Check your email inbox to verify"
      );
    }
    

    const accessToken = generateToken(user);
    res.cookie("access", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return response(res, 200, "User logged in sucesfully", {
      user: { name: user.name, email: user.email },
      token: accessToken
    });
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal Server Error, please try again");
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return response(res, 400, "No Account found with this email address");
    }
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    try {
      await sendResetPasswordLinkToEmail(user.email, resetPasswordToken);
      console.log('✅ Email de reset enviado a:', user.email);
    } catch (emailError) {
      console.error('❌ Error al enviar email de reset:', emailError);
      return response(
        res,
        500,
        "Failed to send password reset email. Please try again later."
      );
    }

    return response(
      res,
      200,
      "A password reset link has been sent to your email address"
    );
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal Server Error, please try again");
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const {token} = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return response(res, 400, "invalid or expried reset password token");
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return response(
      res,
      200,
      "your password reset succesfully. you can now login with your new password"
    );
  } catch (error) {
    console.error('❌ Error en reset password:', error);
    return response(res, 500, "Internal Server Error, please try again");
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access", {
      httpOnly: true,
    });

    return response(res, 200, "Succesfully logout out");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal Server Error, please try again");
  }
};


export const checkUserAuth = async (req: Request, res: Response) => {
  try {
    // 🔴 AGREGÁ LOG
    console.log("🟣 req.id recibido:", req.id);

    const userId = req.id; // Ya no necesitás el ?. porque sabés que existe

    if (!userId) {
      console.log("❌ No hay userId en req");
      return response(res, 401, "Unauthenticated, please login to access our data");
    }

    console.log("🟣 Buscando usuario con ID:", userId);

    const user = await User.findById(userId).select(
      "-password -verificationToken -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
      console.log("❌ Usuario no encontrado en BD");
      return response(res, 404, "User not found"); // 404 en lugar de 403
    }

    console.log("🟢 Usuario encontrado:", user.email);

    return response(res, 200, "User retrieved successfully", { user }); // 200 en lugar de 201
  } catch (error) {
    console.log("❌ Error en checkUserAuth:", error);
    return response(res, 500, "Internal Server Error, please try again");
  }
};