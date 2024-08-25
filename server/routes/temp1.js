import express from "express"

const router = express.Router()


router.get('/temp1',(req,res)=>{
    res.status(200).send("Hey there from temp 1!!!")
})

export default router