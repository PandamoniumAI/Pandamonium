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
import * as cheerio from 'cheerio';
import bodyParser from 'body-parser';
import authRoutes from './Routes/Authroute.js';
import characterRoutes from './Routes/CharacterRoute.js';
import reasonRoutes from './Routes/ReasonRoute.js';

const app = express()
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

app.use('/auth', authRoutes);
app.use('/api', characterRoutes);
app.use('/Reason', reasonRoutes);

cron.schedule('*/5 * * * *', async () => {
    try {
        await axios.get(`http://localhost:${PORT}/ping`);
        console.log('server has started again');
    } catch (error) {
        console.log('Error pinging server:', error);
    }
});

app.get('/ping', (req, res) => {
    console.log('Ping received');
    res.send('Pong');
});





const filePath = path.join('Public', 'JSONS', 'id.json');

app.post('/api/id', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is empty' });
        }

        const dataToStore = {
            characterId: req.body.characterId,
            timestamp: Date.now()
        };

        await fs.promises.writeFile(filePath, JSON.stringify(dataToStore, null, 2), 'utf8');
        res.status(200).json({ message: 'Data stored successfully', data: dataToStore });

    } catch (error) {
        res.status(500).json({ error: 'Error storing data', details: error.message });
    }
});

app.get('/api/id/get', (req, res) => {
    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Character ID file not found' });
        }

        const data = fs.readFileSync(filePath, 'utf8');
        
        if (!data || data.trim() === '') {
            return res.status(404).json({ error: 'Character ID data is empty' });
        }

        let storedData;
        try {
            storedData = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).json({ error: 'Invalid character ID data format' });
        }
        
        if (storedData && typeof storedData.characterId === 'number') {
            return res.status(200).json({ characterId: storedData.characterId });
        } else {
            return res.status(404).json({ error: 'Invalid character ID format' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error reading character ID', details: error.message });
    }
});





app.post('/shorten', async (req, res) => {
    try {
        const { image, name, description } = req.body;
        const base64Data = image.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');
        const imageSize = buffer.length;

        if (imageSize > 12400) {
            return res.status(413).json({ error: 'Image too large' });
        }

        const shortenedData = {
            name,
            description,
            image: base64Data
        };

        res.json(shortenedData);
    } catch (error) {
        res.status(500).json({ error: 'Error shortening image', details: error.message });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
});