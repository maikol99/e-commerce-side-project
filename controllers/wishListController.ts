import { Request, Response } from "express";
import { response } from "../utils/responseHandler";
import Cartitems, { ICartItem } from "../models/Cartitems";
import Products from "../models/Products";
import WishList from "../models/WhisList";


// =====================
//   Agregar producto a la wishlist
// =====================
export const addToWishList =  async(req:Request , res:Response) => {
    try {
        const userId = req.id;             // ID del usuario autenticado
        const { productId } = req.body;    // ID del producto enviado en el body

        // Verificar que el producto existe en la base de datos
        const product = await Products.findById(productId);
        if (!product) {
            return response(res, 404, 'Product not found');
        }

        // Buscar si el usuario ya tiene una wishlist creada
        let wishList = await WishList.findOne({ user: userId });

        // Si no tiene wishlist, crear una nueva
        if(!wishList) {
            wishList = new WishList({
                user: userId,
                products: []
            });
        }

        // Si el producto aún no está en la wishlist, agregarlo
        if(!wishList.products.includes(productId)){
            wishList.products.push(productId);
            await wishList.save();
        }

        return response(res,200,'Product added to wishList', wishList);

    } catch (error) {
        console.log(error);
        return response(res, 500, "Internal Server Error, please try again");
    }
}



// =====================
//   Eliminar producto de la wishlist
// =====================
export const removeFromWishlist = async (req: Request, res: Response) => {
    try {
        const userId = req.id;               // ID del usuario autenticado
        const { productId } = req.params;    // Producto a eliminar

        // Buscar wishlist del usuario
        let wishList = await WishList.findOne({ user: userId });

        if(!wishList){
            return response(res,404,'WishList not found this user');
        }

        // Filtrar y dejar todos menos el que se quiere eliminar
        wishList.products = wishList.products.filter(
            (id) => id.toString() !== productId
        );

        await wishList.save();
        return response(res,200,'Product removed from wishlist successfully');

    } catch (error) {
        console.log(error);
        return response(res, 500, 'Internal Server Error, please try again');
    }
};



// =====================
//   Obtener wishlist del usuario
// =====================
export const getwishListByUser = async (req: Request, res: Response) => {
    try {
        const userId = req?.id;   // ID desde el middleware

        // Buscar wishlist del usuario y hacer populate para obtener los datos de los productos
        const wishList = await WishList.findOne({ user: userId }).populate('products');

        if (!wishList) {
            return response(res, 404, 'WishList is empty', { Products: [] });
        }

        await wishList.save(); // (no es necesario guardar pero tampoco afecta)

        return response(res, 200, 'User WishList get successfully', wishList);

    } catch (error) {
        console.log(error);
        return response(res, 500, 'Internal Server Error, please try again');
    }
};
