import express from 'express';

import cors from 'cors';

import 'dotenv/config';

import multer from 'multer';

import connectDB from './config/db.js';

import authRouter from './routes/authRoutes.js';
import boardRouter from './routes/boardRoutes.js';
import sectionRouter from './routes/sectionRoutes.js';
import jobRouter from './routes/jobRoutes.js';

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(multer().none());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/auth', authRouter);
app.use('/api/boards', boardRouter);
app.use('/api/sections', sectionRouter);
app.use('/api/jobs', jobRouter);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
