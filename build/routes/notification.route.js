"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const notification_controller_1 = require("../controllers/notification.controller");
const order_controller_1 = require("../controllers/order.controller");
const notificationRouter = express_1.default.Router();
notificationRouter.get("/get-all-notifications", (0, auth_1.authorizeRoles)("admin"), notification_controller_1.getNotifications);
notificationRouter.put("/update-notification/:id", (0, auth_1.authorizeRoles)("admin"), notification_controller_1.updateNotifications);
notificationRouter.get("/get-orders", (0, auth_1.authorizeRoles)("admin"), order_controller_1.getAllOrders);
exports.default = notificationRouter;
// getNotifications
