import express from 'express'
import verifyUser from '../server/middleware/verifyUser.js';
import { createPost, getAllPosts } from '../server/controller/postController.js';
import upload from "../server/middleware/multer/multer.js";
const router = express.Router();

router.post('/create', verifyUser,  upload.single('image'), createPost);
router.get('/posts', getAllPosts)


export default router;