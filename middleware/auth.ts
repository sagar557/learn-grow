import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "./catchAsyncError";

// Authenticated user middleware
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        return next(new ErrorHandler("Please login to access this resource", 400));
    }
    
    try {
        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET as string) as IUser;
        if (!decoded) {
            return next(new ErrorHandler("Access token is not valid", 400));
        }
        req.user = decoded; // Store decoded token payload directly in req.user
        next();
    } catch (err) {
        return next(new ErrorHandler("Access token is not valid", 400));
    }
});

// Authorize roles middleware
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IUser;
        if (!user) {
            return next(new ErrorHandler("User is not authenticated", 401));
        }
        if (!roles.includes(user.role)) {
            return next(new ErrorHandler(`Role: ${user.role} is not allowed to access this resource`, 403));
        }
        next();
    }
}
