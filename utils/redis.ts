// import Redis from "ioredis";
// import dotenv from 'dotenv';

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
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = (() => {
    if (process.env.REDIS_URL) {
        console.log('Redis is connected');
        return new Redis(process.env.REDIS_URL, {
            retryStrategy(times) {
                return Math.min(times * 50, 2000);
            },
            maxRetriesPerRequest: 50,
        });
    }
    console.error('Redis connection failed: REDIS_URL is not defined');
    return new Redis({ host: 'localhost', port: 6379 });
})();

export default redisClient;
