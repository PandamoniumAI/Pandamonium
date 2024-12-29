import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import path from 'path';
import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';
import cron from 'node-cron';
import rateLimit from 'express-rate-limit';

// import cheerio from 'cheerio';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'Public')));
app.use(cors());
app.options('*', cors());

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again later.',
});


app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

cron.schedule('*/5 * * * *', async () => {
    try {
        await axios.get(`http://localhost:${PORT}/ping`);
        console.log('server has started again');
    } catch (error) {
        console.log('Error pinging server:', error);
    }
});

app.get('/ping', (req: Request, res: Response) => {
    console.log('Ping received');
    res.send('Pong');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
});
