import express from "express"
import { authenticateJwt } from "../middleware/index.js";
import pool from "../connections/db.js";
import { acceptRequest, listFriend, listRequest, sendRequest, sentRequest } from "../controllers/friendRequest.js";
const router = express.Router();

router.get('/', authenticateJwt, async (req, res) => {
    
    const { userId } = req
    console.log(userId)
    try {
        const response = await listFriend(userId);
        const data = JSON.stringify(response)
        // console.log(data)
        res.status(200).send(data)
    } catch (e) {
        console.log(e)
        res.status(404).send("Encountered some error")
    }

});


export default router.get('/users', authenticateJwt, async (req, res) => {
    const { userId } = req
    const query = `SELECT uid, name,username FROM profile where uid != ?`;
    const [rows] = await pool.query(query, String(userId))
    console.log(rows)
    res.status(200).send(rows)
})





router.post('/sendRequest', authenticateJwt, async (req, res) => {
    const { receiverId } = req.body;
    console.log(receiverId)
    const { userId } = req

    try {
        const response = await sendRequest(userId, receiverId);
        const data = JSON.stringify(response)
        // console.log(data)
        res.status(200).send(data)
    } catch (e) {
        console.log(e)
        res.status(404).send("Encountered some error")
    }

});

router.get('/sentRequest', authenticateJwt, async (req, res) => {
    const { userId } = req

    try {
        const response = await sentRequest(userId);
        const data = JSON.stringify(response)
        // console.log(data)
        res.send(data)
    } catch (e) {
        console.log(e)
        res.send("Encountered some error")
    }

});


router.get('/listRequest', authenticateJwt, async (req, res) => {
    const { userId } = req

    try {
        const response = await listRequest(userId);
        const data = JSON.stringify(response)
        // console.log(data)                
        res.status(200).send(data)
    } catch (e) {
        console.log(e)
        res.status(500).send("Encountered some error")
    }

});

router.patch('/acceptRequest' , authenticateJwt ,async (req,res)=>{
    // const {userId} = req
    const {uid} = req.body 
    try{
        const response = await acceptRequest(uid)
        // const data = response.json()
        res.status(200).json({"message":"Request accepted"})
    }catch(e){
        console.log(e)
        res.status(400).send("Something is off")
    }
})


