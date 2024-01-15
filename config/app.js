import express from 'express';
import { publicRouter } from '../routes.js';

export const app = express();
app.use(express.json());
app.use(publicRouter)