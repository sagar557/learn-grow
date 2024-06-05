// import { Redis } from "ioredis";
// require( 'dotenv').config();

// const redisClient = () => {
//     if(process.env.REDIS_URL){
//         console.log('Redis is connected');
//         return process.env.REDIS_URL;
//     }
//     throw new  Error("Redis connection failed");
// };
// export const redis = new  Redis(redisClient());

import { Redis } from "ioredis";
require('dotenv').config();

const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log('Redis is connected');
        return new Redis(process.env.REDIS_URL, {
            retryStrategy(times) {
                return Math.min(times * 50, 2000);
            },
            maxRetriesPerRequest: 50,
        });
    }
    throw new Error("Redis connection failed");
};

export const redis = redisClient();
