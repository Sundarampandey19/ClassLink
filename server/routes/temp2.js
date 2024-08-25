import express from "express"

const router = express.Router()


router.get('/temp2',(req,res)=>{
    res.status(200).send("Hey there!!!")
})

export default router