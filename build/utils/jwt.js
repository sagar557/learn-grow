"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.accessTokenOptions = void 0;
const redis_1 = __importDefault(require("./redis"));
// Parse env variables to integrate with fallback values
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
// Options for cookies
exports.accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
};
const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const id = user._id;
    // Upload session to redis
    redis_1.default.set(id, JSON.stringify(user));
    res.cookie("access_token", accessToken, exports.accessTokenOptions);
    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
    });
};
exports.sendToken = sendToken;
