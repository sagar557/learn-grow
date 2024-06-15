// import Redis from "ioredis";
import dotenv from 'dotenv';

// dotenv.config();

// const redisClient = () => {
//     if (process.env.REDIS_URL) {
//         console.log('Redis is connected');
//         return new Redis(process.env.REDIS_URL, {
//             retryStrategy(times) {
//                 return Math.min(times * 50, 2000);
//             },
//             maxRetriesPerRequest: 50,
//         });
//     }
//     throw new Error("Redis connection failed");
// };

// export const redis = redisClient();

const Redis = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on('connect', () => {
  console.log('Redis connected');
});

redisClient.on('error', (err:any) => {
  console.error('Redis connection error:', err);
  throw new Error("Redis connection failed");
});

module.exports = redisClient;
