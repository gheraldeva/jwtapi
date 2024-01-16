import express from 'express';
import { publicRouter } from '../routes.js';
import { errorMiddleware } from '../middleware/resmiddleware.js';
import { userRouter } from '../publicrouter.js';

export const app = express();
app.use(express.json());

app.use(publicRouter)
app.use(userRouter)

app.use(errorMiddleware)