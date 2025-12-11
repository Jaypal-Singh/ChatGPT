import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import AuthRoutes from './Routes/AuthRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/v1/auth', AuthRoutes);


export default app;
