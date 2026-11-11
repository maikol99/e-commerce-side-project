import { Request, Response } from "express";
import { response } from "../utils/responseHandler";
import Order from "../models/Order";

// Crear o registrar una orden de compra
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    if (!userId) {
      return response(res, 401, "Usuario no autenticado");
    }

    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return response(res, 400, "El carrito no contiene artículos para la orden");
    }

    const formattedItems = items.map((it: any) => ({
      product: it.product || it._id || it.productId,
      quantity: it.quantity || 1,
      price: it.price || it.finalPrice || 0,
    }));

    const newOrder = new Order({
      user: userId,
      items: formattedItems,
      totalAmount: totalAmount || formattedItems.reduce((acc: number, it: any) => acc + it.price * it.quantity, 0),
      shippingAddress: shippingAddress || null,
      paymentStatus: "complete",
      paymentMethod: paymentMethod || "Mercado Pago / Tarjeta",
    });

    await newOrder.save();
    const populatedOrder = await Order.findById(newOrder._id).populate("items.product");

    return response(res, 201, "Orden creada con éxito", populatedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return response(res, 500, "Error interno al procesar la orden");
  }
};

// Obtener pedidos del usuario actual
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    if (!userId) {
      return response(res, 401, "Usuario no autenticado");
    }

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return response(res, 200, "Pedidos obtenidos con éxito", orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return response(res, 500, "Error interno al obtener pedidos");
  }
};

// Obtener orden por ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, user: userId }).populate("items.product");
    if (!order) {
      return response(res, 404, "Orden no encontrada");
    }

    return response(res, 200, "Orden obtenida con éxito", order);
  } catch (error) {
    console.error("Error fetching order by id:", error);
    return response(res, 500, "Error interno");
  }
};
