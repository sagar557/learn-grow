import express  from "express";
import { authorizeRoles } from "../middleware/auth";
import { createOrder, getAllOrders, newPayment, sendStripePublishableKey } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder); 
orderRouter.get("/get-orders", authorizeRoles("admin"), getAllOrders); 
orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey); 
orderRouter.post("/payment", newPayment); 





export default orderRouter;