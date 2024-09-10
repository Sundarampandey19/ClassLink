import { Server } from "socket.io";
import authenticateSocket from "../middleware/socketMiddleware.js";
import handleSocketEvents from "../routes/socketConn.js";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Set this to your frontend domain in production
            methods: ["GET", "POST"]
        }
    });

    // Apply authentication middleware
    io.use(authenticateSocket);

    // Set up socket events
    handleSocketEvents(io);

    return io;
};

export default initializeSocket;
