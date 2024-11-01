import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { SECRET } from '../middleware/index.js';
// import redisClient from "../connections/redisClient.js";
// import { produceMessage } from "../services/kafka.js";

// const redisPublisher = redisClient.duplicate(); 
// const redisSubscriber = redisClient.duplicate(); 

// await redisPublisher.connect();
// await redisSubscriber.connect();

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // Middleware for Socket.IO to authenticate using JWT
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Authentication error"));
        }
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                return next(new Error("Authentication error"));
            }
            // Store the user ID in the socket object for later use
            socket.userId = decoded.id;
            next();
        });
    });

    // Handle a client connection
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.userId}`);

        socket.on('joinRoom', ({ roomId }) => {
            socket.join(roomId);
            console.log(`User ${socket.userId} joined room: ${roomId}`);
        });

        // Listen for a message event and emit it directly to the receiver
        socket.on('message', (data) => {
            console.log(JSON.stringify(data));
            const { temp_message_id, roomId, message_type, content, receiver_id } = data;

            const chatMessage = {
                temp_message_id,
                sender_id: socket.userId,
                receiver_id, 
                message_type,
                content,
                roomId
            };

            // Directly emit the message to the receiver
            io.to(receiver_id).emit('receiveMessage', chatMessage);

            // Redis publish omitted
            // redisPublisher.publish('chat-room', JSON.stringify({ roomId, chatMessage }));
        });

        // Handle client disconnection
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.userId}`);
        });
    });
};

export default initializeSocket;
