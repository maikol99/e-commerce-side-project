import express from "express";
import { authenticatedUser } from "../middleware/AuthMiddleware";
import * as orderController from "../controllers/orderController";

const router = express.Router();

router.post("/", authenticatedUser, orderController.createOrder);
router.get("/", authenticatedUser, orderController.getUserOrders);
router.get("/:orderId", authenticatedUser, orderController.getOrderById);

export default router;
