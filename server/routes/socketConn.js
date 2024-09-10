import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { SECRET } from '../middleware/index.js';

const initializeSocket = (server) => {
    
    const io = new Server(server, {
        cors: {
            origin: "*", // Set this to your frontend domain in production
            methods: ["GET", "POST"]
        }
    });

    // Middleware for Socket.IO to authenticate using JWT
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        // console.log(token)
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



        // Listen for a custom event (e.g., a message event)
        socket.on('message', (data) => {
            console.log(JSON.stringify(data))
            const {roomId} = data
            
            io.to(roomId).emit('receiveMessage', { message: data.message });
            io.emit('message', { userId: socket.userId, message: data });
        });

        
        // Handle client disconnection
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.userId}`);
        });
    });
};

export default initializeSocket;

