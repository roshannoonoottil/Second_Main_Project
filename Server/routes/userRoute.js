import express from 'express';
const router = express.Router();
import userController from '../server/controller/userController.js';
import verifyUser from '../server/middleware/verifyUser.js';
import upload from "../server/middleware/multer/multer.js";

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.post("/google-auth", userController.googleLogin);
router.get('/home', verifyUser,  userController.home)
router.post('/complete-profile', verifyUser,  upload.single('image'), userController.completeProfile)

export default router;
