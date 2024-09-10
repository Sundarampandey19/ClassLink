import express from "express"
import auth from "./routes/auth.js"
import cors from "cors"
import friend from "./routes/addFriend.js"
import initializeSocket from "./routes/socketConn.js";
import { createServer } from "http";

const app = express()
const server = createServer(app);

app.use(cors())
app.use(express.json())

app.use(auth)
app.use('/friend', friend)

 initializeSocket(server);


server.listen('3000', () => {
    console.log("App is listening on port:3000")
})
