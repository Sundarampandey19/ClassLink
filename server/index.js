import pool from "./db.js";
import express from "express"
import temp1 from "./routes/temp1.js"
import temp2 from "./routes/temp2.js"
import cors from "cors"
const app = express()
app.use(cors())
// let username = "user10213"
// let name = "pureore"
// let ph_number = 542345345
// let password = "mynameiskhan"
// let email = "1newsm@gmail11.com"

// createProfile(username, name,  ph_number, password, email)
// createProfile(user10213,pureAgefl19, 9909209,password,1newsm@gmail11.com)


app.use(express.json())
import auth from "./routes/auth.js"
import { createProfile } from "./controllers/profile.js";
app.use(auth)
// app.use(temp1)
// app.use(temp2)


app.listen('3000',()=>{
    console.log("App is listening on port:3000")
})
