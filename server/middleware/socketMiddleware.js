import jwt from "jsonwebtoken";
import { SECRET } from '../middleware/index.js';

const authenticateSocket = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error("Authentication error"));
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error"));
        }
        socket.userId = decoded.id;
        next();
    });
};

export default authenticateSocket;
