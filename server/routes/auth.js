import jwt from "jsonwebtoken";
import express from 'express'
// import { authenticateJwt, SECRET } from "../middleware/index.js"
const router = express.Router();
import pool from "../db.js"
import { createProfile } from '../controllers/profile.js';
import { getHashedPassword, verifyPassword } from '../utils/hashUtil.js';
const SECRET = 'SECr3t';



router.post('/signup', async (req, res) => {
    console.log("Request received")
    let { username, name, password, ph_number, email } = req.body;
    if (!username || !name || !password || !ph_number || !email) {
        return res.status(400).send("Missing values found");
    }
    try {
        const query = `SELECT * FROM profile WHERE username = ?;`
        let response = await pool.query(query, username)
        if (response.length !== 0) {
            res.status(409).send("Username already exists")

        } else {
            password = await getHashedPassword(password)
            const result = await createProfile(username, name, ph_number, password, email)
            console.log(result)
            res.status(200).json({ "message": "Made the user" })

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
    let response = await pool.query(query, username)
    if (response.length === 0) {
        res.status(409).send("User doesn't exist")

    } else {
        try {
            const result = await verifyPassword(password, response[0].hashed_password)
            console.log(result)
            if (!result) {
                res.status(200).json({ "message": "Wrong Password" })
            }
            else {
                //continue the jwt
                const token = jwt.sign({ id: response[0].uid }, SECRET, { expiresIn: '1h' });
                res.status(200).json({ "message": "Logged in successfully", token })

            }
        } catch {
            res.status(500).send("Error while Logging in")
        }

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