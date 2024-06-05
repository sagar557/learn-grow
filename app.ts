require("dotenv").config();
import express, {Request, Response, NextFunction }  from "express";
export const app = express();
import cors  from 'cors';
import cookieParser from "cookie-parser";
import {ErrorMiddleware} from "./middleware/error";
import userRouter  from './routes/user.route';
import courseRouter from './routes/course.route';
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import  layoutRouter from "./routes/layout.route";
import {rateLimit} from 'express-rate-limit'

// body parser
app.use(express.json({limit: '50mb'})); 

// cookies parser
app.use(cookieParser());

//cors 
app.use(cors({
    // origin: ["https://learn-grow.onrender.com"],
    origin: ["http://localhost:4200"],
    credentials:true,
}));

// api rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

//routers
app.use("/api/v1",userRouter, courseRouter, orderRouter, notificationRouter,analyticsRouter, layoutRouter );


// testing api 
app.get("/test", (req:Request, res:Response, next:NextFunction) =>{
    res.status(200).json({
        success:true,
        message: "Server is working",
    })
} );

// unknown route
app.all("*", (req:Request, res:Response, next:NextFunction) =>{
    const err = new  Error(`Not Found - ${req.originalUrl}`) as any;
    err.status = 404;
    next(err);
})


// middleware calls
app.use(limiter);

app.use(ErrorMiddleware);
