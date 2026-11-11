import { Request, Response } from "express";
import { response } from "../utils/responseHandler";
import { uploadToCloudinary } from "../config/cloudinaryConfig";
import Products from "../models/Products";


export const createProduct = async (req: Request, res: Response) => {
    try {
        const { title, category, condition, classType, subject, price, author, edition, description, finalPrice, shippingCharge, paymentMode, paymentDetails, seller } = req.body;

        const sellerId = req.id

        const images = req.files as Express.Multer.File[];
        if (!images || images.length === 0) {
            return response(res, 400, 'image is required');
        }

        // let parsedPaymentDetails = JSON.parse(paymentDetails);

        // if (paymentMode === 'UPI' && (!parsedPaymentDetails || !parsedPaymentDetails.upiId)) {
        //     return response(res, 400, 'UPI ID is required for payment');
        // }

        // if (paymentMode === 'Bank Account' &&
        //     (!parsedPaymentDetails || !parsedPaymentDetails.bankDetails ||
        //         !parsedPaymentDetails.bankDetails.accountNumber ||
        //         !parsedPaymentDetails.bankDetails.ifscCode ||
        //         !parsedPaymentDetails.bankDetails.bankName
        //     )
        // ) {
        //     return response(res, 400, 'Bank Account details is required for payment');
        // }
        

        const uploadPromise = images.map(file => uploadToCloudinary(file as any))
        const uploadImages = await Promise.all(uploadPromise)
        const imageUrl = uploadImages.map(image => image.secure_url)

        const product = new Products({
            title,
            description,
            subject,
            category, condition, classType, price, finalPrice, shippingCharge,
            paymentMode,
            // paymentDetails: parsedPaymentDetails,
            author,
            edition,
            seller: sellerId,
            images: imageUrl
        })

        await product.save();
        return response(res, 200, 'Product Created Succesfully', product)

    } catch (error) {
        console.log(error)
        return response(res, 500, 'Internal Server Error, please try again')
    }
};


export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Products.find()
            .sort(({ createdAt: -1 }))
            .populate('seller', 'name email')

        return response(res, 200, 'products fetched Successfully', products)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'Internal Server Error, please try again')
    }
}


export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Products.findById(req.params.id)
            .populate({
                path: "seller",
                select: "name email profilePicture phoneNumber ",
                 populate: {
                    path: "addresses",
                     model: "Address"
                 }

            })

        if (!product) {
            return response(res, 404, 'Product not found for this id')
        }

        return response(res, 200, 'product fetched by Id Successfully', product)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'Internal Server Error, please try again')
    }
}


export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.productId) 

        if(!product){
            return response(res, 404, 'product not found for this id')
        }
        return response(res,200,'Product deleted Successfully')
    } catch (error) {
        console.log(error)
        return response(res, 500, 'Internal Server Error, please try again')
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sellerId = req.id;

        const product = await Products.findById(id);
        if (!product) {
            return response(res, 404, "Libro no encontrado");
        }

        if (product.seller.toString() !== sellerId) {
            return response(res, 403, "No tenés permisos para editar este libro");
        }

        const {
            title,
            category,
            condition,
            classType,
            subject,
            price,
            author,
            edition,
            description,
            finalPrice,
            shippingCharge,
        } = req.body;

        if (title !== undefined) product.title = title.trim();
        if (category !== undefined) product.category = category;
        if (condition !== undefined) product.condition = condition;
        if (classType !== undefined) product.classType = classType;
        if (subject !== undefined) product.subject = subject.trim();
        if (price !== undefined) product.price = Number(price);
        if (author !== undefined) product.author = author.trim();
        if (edition !== undefined) product.edition = edition.trim();
        if (description !== undefined) product.description = description.trim();
        if (finalPrice !== undefined) product.finalPrice = Number(finalPrice);
        if (shippingCharge !== undefined) product.shippingCharge = String(shippingCharge);

        const newImages = req.files as Express.Multer.File[];
        if (newImages && newImages.length > 0) {
            const uploadPromise = newImages.map((file) => uploadToCloudinary(file as any));
            const uploadImages = await Promise.all(uploadPromise);
            const imageUrls = uploadImages.map((img) => img.secure_url);
            product.images = imageUrls;
        }

        await product.save();
        return response(res, 200, "Libro actualizado con éxito", product);
    } catch (error) {
        console.error("Error updating product:", error);
        return response(res, 500, "Error interno al actualizar el libro");
    }
};



export const getProductBySellerId  = async (req:Request, res:Response) => {
    try {
        const sellerId = req.params.sellerId
        if(!sellerId){
            return response(res,400,'Seller not found please provide valid sellerId')
        }
        const product = await Products.find({seller:sellerId})
            .sort({createdAt : -1})
            .populate('seller','name email profilePicture phoneNumber')

        if (!product) {
            return response(res, 404, 'Product not found for this seller')
        }

        return response(res, 200, 'product fetched by sellerId Successfully', product)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'Internal Server Error, please try again')
    }
}