import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const signup =  async (req, res) => {

    try {
        console.log('signup Controller');
        console.log(req.body);
        
        const { fullName, mobile, email, password } = req.body;
        let user = await userModel.findOne({ email });
        console.log("User Exist : ", user);
        if (user) return res.status(400).send("This email is already used.");
    
        const hashPass = await bcrypt.hash(password, 10);
        console.log('hashed password', hashPass);
    
        const userData = new userModel({
            fullName,
            mobile,
            email,
            password: hashPass,
            isAdmin: 'false'
        });
        console.log('User Details :',userData);
        
        await userData.save();
        console.log("Saved data", userData);
        res.json({ data: "User data saved in database" });
    } catch (err) {
        console.log("Error at user Register", err);
    }
}


const login = async (req, res) => {
    try {
        console.log('Login Controller');

        // Find user by email
        const userData = await userModel.findOne({ email: req.body.email });
        if (!userData) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        // Compare passwords
        const isValidPassword = await bcrypt.compare(req.body.password, userData.password);
        if (!isValidPassword) {
            return res.json({ success: false, message: "Invalid password" });
        }

        // Prepare user details (ensure it matches signup structure)
        const userDetails = {
            userId: userData._id,
            fullName: userData.fullName,  // Changed from `name` to `fullName` to match signup
            email: userData.email,
            mobile: userData.mobile,
            isAdmin: userData.isAdmin,   // Ensure isAdmin is included
            createdAt: userData.createdAt,
        };

        // Generate JWT token
        const token = jwt.sign(userDetails, process.env.USER_JWT_SECRET, { expiresIn: '1h' });

        // Send response
        res.json({ success: true, token: token, data: userDetails });
        console.log('User signed in:', userDetails);

    } catch (error) {
        console.log("Login error", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export default {signup, login}