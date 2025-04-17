import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { connectDB } from "./server/model/userModel.js";
import logger from 'morgan';
import cors from 'cors'

import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRouter.js';

const app = express();

connectDB();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
  
  app.use(cors(corsOptions)); // Use the CORS middleware with the specified options

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

export default app;
