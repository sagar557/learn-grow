import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
}

// Parse env variables to integrate with fallback values
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);

// Options for cookies
export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();

    // Upload session to redis
    redis.set(user._id, JSON.stringify(user));

    res.cookie("access_token", accessToken, accessTokenOptions);

    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
    });
}
