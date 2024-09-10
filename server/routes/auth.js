import jwt from "jsonwebtoken";
import express from 'express'
const router = express.Router();
import pool from "../connections/db.js"
import { createProfile } from '../controllers/profile.js';
import { getHashedPassword, verifyPassword } from '../utils/hashUtil.js';
import { authenticateJwt } from "../middleware/index.js";
const SECRET = 'SECr3t';



router.post('/signup', async (req, res) => {
    console.log("Request received")
    let { username, name, password, ph_number, email } = req.body;
    if (!username || !name || !password || !ph_number || !email) {
        return res.status(400).send("Missing values found");
    }
    try {
        console.log(username,name,password,ph_number,email)
        const query = `SELECT * FROM profile WHERE username = ?;`
        let [rows,fields] = await pool.query(query, username)
        console.log(rows)
        if (rows.length !== 0) {
            res.status(409).send("Username already exists")

        } else {
            password = await getHashedPassword(password)
            const result = await createProfile(username, name, ph_number, password, email)
            console.log(result)
            const token = jwt.sign({ id: result[0].uid }, SECRET, { expiresIn: '1h' });
            res.status(200).json({ "message": "User created successfully", token })
            

        }
    } catch (err) {
        if (err.message === 'Duplicate username') {
            res.status(409).send("Username already exists");
        } else if (err.message === 'Duplicate phone number') {
            res.status(409).send("Phone number already exists");
        } else if (err.message === 'Duplicate email') {
            res.status(409).send("Email already exists");
        } else {
            console.error('Error processing signup:', err);
            res.status(500).send("Internal server error");
        }
    }

});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    (typeof username === 'string' ? username : JSON.stringify(username))
    const query = `SELECT * FROM profile WHERE username = ?;`
    let [rows] = await pool.query(query, username)
    console.log("rows" , rows)
    // console.log("fiels" , fields)
    if (rows.length === 0) {
        console.log("Username not found")
        res.status(409).send("User doesn't exist")

    } else {
        try {
            const result = await verifyPassword(password, rows[0].hashed_password)
            console.log(result)
            if (!result) {
                res.status(200).json({ "message": "Wrong Password" })
            }
            else {
                    const token = jwt.sign({ id: rows[0].uid }, SECRET, { expiresIn: '1h' });
                res.status(200).json({ "message": "Logged in successfully", token })
                
            }
        } catch {
            res.status(500).send("Error while Logging in")
        }

    }
});

router.post('/me', authenticateJwt, async (req, res) => {     
    const { userId} = req
    try {
        const query = `SELECT * FROM profile WHERE uid = ?;`
        let [rows,fields] = await pool.query(query, userId)
        console.log(rows)
        if (rows.length===0) {
            
            res.status(200).json({ "message": "User not found" })
        }
        else {
            const {name} = rows[0]
            console.log(name)
            res.status(200).json({  username : name})   
        }
    } catch {
        res.status(500).send("Error getting user")
    }
    
});

export default router