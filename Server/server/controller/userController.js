import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
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

export default {signup}