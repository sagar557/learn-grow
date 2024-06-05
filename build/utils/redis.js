"use strict";
// import { Redis } from "ioredis";
// require( 'dotenv').config();
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
// const redisClient = () => {
//     if(process.env.REDIS_URL){
//         console.log('Redis is connected');
//         return process.env.REDIS_URL;
//     }
//     throw new  Error("Redis connection failed");
// };
// export const redis = new  Redis(redisClient());
const ioredis_1 = require("ioredis");
require('dotenv').config();
const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log('Redis is connected');
        return new ioredis_1.Redis(process.env.REDIS_URL, {
            retryStrategy(times) {
                return Math.min(times * 50, 2000);
            },
            maxRetriesPerRequest: 50,
        });
    }
    throw new Error("Redis connection failed");
};
exports.redis = redisClient();
