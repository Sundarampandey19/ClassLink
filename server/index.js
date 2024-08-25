import pool from "./db.js";
import express from "express"
import temp1 from "./routes/temp1.js"
import temp2 from "./routes/temp2.js"

const app = express()

app.use(express.json())
import auth from "./routes/auth.js"
app.use(auth)
// app.use(temp1)
// app.use(temp2)


app.listen('3000',()=>{
    console.log("App is listening on port:3000")
})
