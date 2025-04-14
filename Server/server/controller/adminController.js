import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
import 'dotenv/config';
import jwt from 'jsonwebtoken';


const login = async (req, res) => {
    try {
        console.log('adminLoginPost enter');
        console.log(req.body);

        const adminData = await userModel.findOne({ email: req.body.email });

        if (!adminData) {
            return res.json({ success: false, message: "Invalid email address" });
        }

        // 🔒 Check if user is an admin BEFORE password check
        if (!adminData.isAdmin) {
            return res.json({ success: false, message: "Access denied: Not an admin" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, adminData.password);

        if (!passwordMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        const payload = {
            userName: adminData.name,
            email: adminData.email,
            mobile: adminData.mobile,
            image: adminData.imagePath,
            createdAt: adminData.createdAt,
            isAdmin: adminData.isAdmin,
        };

        const token = jwt.sign(payload, process.env.ADMIN_JWT_SCRECT, { expiresIn: '1h' });

        res.json({ success: true, token });

    } catch (e) {
        console.log('error in the adminLoginPost : ', e);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export default {login}