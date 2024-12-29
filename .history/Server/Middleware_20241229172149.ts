import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import path from 'path';
import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { fileURLToPath } from 'url';
import sanitize from 'sanitize-html';
import bcrypt from 'bcrypt';
import rateLimit from 'express-rate-limit';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const PORT = 8080;

// Middleware setup
app.use(express.static(path.join(__dirname, 'Public')));
app.use(cors());
app.options('*', cors());

// Rate limiter for login routes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit to 5 requests per windowMs
  message: 'Too many login attempts, please try again later.',
});

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Cron job to ping server every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    await axios.get(`http://localhost:${PORT}/ping`);
    console.log('Server has started again');
  } catch (error) {
    console.log('Error pinging server:', error);
  }
});

// Ping route
app.get('/ping', (req, res) => {
  console.log('Ping received');
  res.send('Pong');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});
