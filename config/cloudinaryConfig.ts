import multer from "multer";
import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from "cloudinary";
import dotenv from "dotenv";
import { RequestHandler } from "express";

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

interface CustomFile extends Express.Multer.File {
    path: string;
}

const uploadToCloudinary = async (file: CustomFile): Promise<UploadApiResponse> => {
    const isCloudinaryConfigured =
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_KEY !== "demo" &&
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_CLOUD_NAME !== "demo";

    const serverUrl = process.env.BACKEND_URL || "http://localhost:8080";

    if (!isCloudinaryConfigured) {
        console.log(`ℹ️ [Dev Mode] Cloudinary no configurado o en demo. Usando almacenamiento local para: ${file.filename}`);
        return {
            secure_url: `${serverUrl}/uploads/${file.filename}`,
            public_id: file.filename,
        } as unknown as UploadApiResponse;
    }

    const options: UploadApiOptions = {
        resource_type: "image",
    };

    return new Promise((resolve) => {
        cloudinary.uploader.upload(file.path, options, (error, result) => {
            if (error) {
                console.warn(`⚠️ Error al subir a Cloudinary. Usando fallback local para ${file.filename}:`, error.message);
                return resolve({
                    secure_url: `${serverUrl}/uploads/${file.filename}`,
                    public_id: file.filename,
                } as unknown as UploadApiResponse);
            }
            resolve(result as UploadApiResponse);
        });
    });
};

const multerMiddleware : RequestHandler = multer({dest: "uploads/"}).array("images",4);

export {multerMiddleware,uploadToCloudinary};