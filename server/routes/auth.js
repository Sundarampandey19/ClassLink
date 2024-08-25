// import jwt from "jsonwebtoken";
import express from 'express'
// import { authenticateJwt, SECRET } from "../middleware/index.js"
const router = express.Router();
import pool from "../db.js"   
import { createProfile } from '../controllers/profile.js';
import stringifyArray from '../utils/stringify.js';
import { getHashedPassword } from '../utils/hashUtil.js';
import validateFields from '../utils/checkMissing.js';



router.post('/signup', async (req, res) => {
    console.log("Request received")
    let { username,name, password , ph_number , email } = req.body;
    let values = [username,name, password , ph_number , email]
    let svalues = stringifyArray(values)
    console.log(values)
    const query = `SELECT * FROM profile WHERE username = ?;`
    const response = await pool.query(query,username)
    if(response.length !==0){
            res.status(409).send("User already exists")
    }else{
        let validValues = await validateFields(svalues)
        if(validValues!=svalues)res.status(400).send("Missing Values found")
        else{
            let hashedPass = await getHashedPassword(password)
            res.send("Creating a new user")
        }
    }
    



});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    username = username.toString();

    // const user = await User.findOne({ username, password });
    // get the hashed password
    // find the username and the hashed password and
    if (user) {
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

// router.get('/me', authenticateJwt, async (req, res) => {
//     const user = await User.findOne({ _id: req.userId });
//     if (user) {
//         res.json({ username: user.username });
//     } else {
//         res.status(403).json({ message: 'User not logged in' });
//     }
// });

export default router