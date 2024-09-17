import { createClient } from 'redis';

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT  // Fix here from process.send to process.env
    }
});

redisClient.on('connect', () => {
    console.log('Redis connected');
});

redisClient.on('end', () => {
    console.log('Redis disconnected');
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect(); 

export default redisClient;