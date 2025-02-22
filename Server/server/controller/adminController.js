import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
import 'dotenv/config';
import jwt from 'jsonwebtoken';


const login = async (req, res) => {
    try {
        console.log('adminLoginPost enter');
        console.log(req.body)
        const adminData = await userModel.findOne({ email: req.body.email });
        if (adminData) {
            const passwordMatch = await bcrypt.compare(req.body.password, adminData.password)
            if (passwordMatch) {
                if (adminData.isAdmin) {
                    const Data = {
                        userName: adminData.name,
                        email: adminData.email,
                        mobile: adminData.mobile,
                        image: adminData.imagePath,
                        createdAt: adminData.createdAt,
                        isAdmin: adminData.isAdmin,
                    }
                    const token = jwt.sign(Data, process.env.ADMIN_JWT_SCRECT,{ expiresIn: '1h' } )
                    res.json({ success: true, token: token })
                } else {
                    res.json({ success: false, message: 'you or not otherized' })
                }
            } else {
                res.json({ success: false, message: "invalid password" });
            }
        } else {
            res.json({ success: false, message: "invalid email address" })
        }
    } catch (e) {
        console.log('error in the adminLoginPost : ', e);
    }
};


export default {login}