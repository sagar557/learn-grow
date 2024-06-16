"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = (() => {
    if (process.env.REDIS_URL) {
        console.log('Redis is connected');
        return new ioredis_1.default(process.env.REDIS_URL, {
            retryStrategy(times) {
                return Math.min(times * 50, 2000);
            },
            maxRetriesPerRequest: 50,
        });
    }
    console.error('Redis connection failed: REDIS_URL is not defined');
    return new ioredis_1.default({ host: 'localhost', port: 6379 });
})();
exports.default = redisClient;
