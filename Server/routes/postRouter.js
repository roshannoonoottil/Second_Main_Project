import express from 'express'
import verifyUser from '../server/middleware/verifyUser.js';
import { createPost } from '../server/controller/postController.js';
const router = express.Router();

router.post('/create', verifyUser, createPost);


export default router;