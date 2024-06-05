"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const order_controller_1 = require("../controllers/order.controller");
const orderRouter = express_1.default.Router();
orderRouter.post("/create-order", order_controller_1.createOrder);
orderRouter.get("/get-orders", (0, auth_1.authorizeRoles)("admin"), order_controller_1.getAllOrders);
orderRouter.get("/payment/stripepublishablekey", order_controller_1.sendStripePublishableKey);
orderRouter.post("/payment", order_controller_1.newPayment);
exports.default = orderRouter;
