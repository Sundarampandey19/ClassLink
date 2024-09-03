import express from "express"
import auth from "./routes/auth.js"
import cors from "cors"
import friend from "./routes/addFriend.js"
const app = express()
app.use(cors())

app.use(express.json())
import { createProfile } from "./controllers/profile.js";
app.use(auth)
app.use('/friend',friend)



app.listen('3000',()=>{
    console.log("App is listening on port:3000")
})
