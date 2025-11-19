import { Request, Response } from "express";
import { response } from "../utils/responseHandler";
import Cartitems, { ICartItem } from "../models/Cartitems";
import Products from "../models/Products";


// =====================
//   Agregar producto al carrito
// =====================
export const addToCart =  async(req:Request , res:Response) => {
    try {
        const userId = req.id; // ID del usuario autenticado (agregado por el middleware)
        const { productId, quantity } = req.body; // Se obtiene el ID del producto y la cantidad enviada en el body

        // Verificar que el producto existe en la base de datos
        const product = await Products.findById(productId);
        if (!product) {
            return response(res, 404, 'Product not found'); // Si no existe, devolvemos error
        }

        // Evitar que un vendedor agregue su propio producto al carrito
        if(product.seller.toString() === userId) {
          return response(res,400, 'you cant add your product to the cart');
        }

        // Buscar si el usuario ya tiene un carrito creado
        let cart = await Cartitems.findOne({user:userId});
        
        // Si el carrito no existe, se crea uno
        if(!cart) {
            cart = new Cartitems({
                user: userId,
                items: [{ product: productId, quantity }]
            });
        }

        // Buscar si el producto ya está en el carrito
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );
        
        // Si ya existe, solo aumentar la cantidad
        if(existingItem){
            existingItem.quantity += quantity;
        } else {
            // Si no existe, agregar un nuevo item al carrito
            const newItem = {
                product: productId,
                quantity: quantity
            };
            cart.items.push(newItem as ICartItem);
        }

        // Guardar carrito actualizado
        await cart.save();

        // Respuesta exitosa
        return response(res,200,'Item added to cart successfuly',cart);

    } catch (error) {
        console.log(error);
        return response(res, 500, "Internal Server Error, please try again");
    }
}



// =====================
//   Eliminar producto del carrito
// =====================
export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const userId = req.id; // ID del usuario autenticado
        const { productId } = req.params; // ID del producto a eliminar

        // Buscar carrito del usuario
        let cart = await Cartitems.findOne({user:userId});

        // Si el carrito no existe, devolver error
        if(!cart){
            return response(res,404,'Cart not found this user');
        }

        // Filtrar para dejar todos menos el que queremos eliminar
        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save(); // Guardar cambios

        return response(res,200,'Item removed to cart successfully');

    } catch (error) {
        console.log(error);
        return response(res, 500, 'Internal Server Error, please try again');
    }
};


// =====================
//   Obtener carrito del usuario
// =====================
export const getCartByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId; // Se toma el ID del usuario desde los parámetros

        // Buscar carrito asociado al usuario
        const cart = await Cartitems.findOne({ user: userId });

        // Si no existe, devolver carrito vacío
        if (!cart) {
            return response(res, 404, 'Cart is empty', {items:[]});
        }

        await cart.save(); // (Realmente no hace falta guardar acá)

        return response(res, 200, 'User Cart get successfully', cart);

    } catch (error) {
        console.log(error);
        return response(res, 500, 'Internal Server Error, please try again');
    }
};
