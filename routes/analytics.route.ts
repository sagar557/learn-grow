import express  from "express";
import { authorizeRoles } from "../middleware/auth";
import { getCoursesAnalytics, getOrderAnalytics, getUsersAnalytics } from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get("/get-users-analytics", authorizeRoles("admin"),getUsersAnalytics);
analyticsRouter.get("/get-courses-analytics", authorizeRoles("admin"),getCoursesAnalytics);
analyticsRouter.get("/get-orders-analytics", authorizeRoles("admin"),getOrderAnalytics);


export default analyticsRouter;