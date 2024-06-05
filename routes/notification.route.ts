import express from "express";
import { authorizeRoles } from "../middleware/auth";
import { getNotifications, updateNotifications } from "../controllers/notification.controller";
import { getAllOrders } from "../controllers/order.controller";
const notificationRouter = express.Router();


notificationRouter.get("/get-all-notifications",authorizeRoles("admin"),getNotifications);
notificationRouter.put("/update-notification/:id",authorizeRoles("admin"),updateNotifications);
notificationRouter.get("/get-orders",authorizeRoles("admin"),getAllOrders);

export default notificationRouter;



// getNotifications