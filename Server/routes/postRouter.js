import express from 'express'
import verifyUser from '../server/middleware/verifyUser.js';
import { createPost, deletePost, getAllPosts, updatePost } from '../server/controller/postController.js';
import upload from "../server/middleware/multer/multer.js";
const router = express.Router();

router.post('/create', verifyUser, upload.single('image'), createPost);
router.get('/posts', getAllPosts)
router.put('/deletepost/:_id',verifyUser, deletePost)
router.post('/updatepost/:_id', verifyUser, upload.single('image'), updatePost)


export default router;             