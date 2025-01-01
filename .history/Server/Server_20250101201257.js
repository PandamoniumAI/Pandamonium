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
import authRoutes from './Route/Authroute.js';
import characterRoutes from './Route/CharacterRoute.js';
import reasonRoutes from './Route/ReasonRoute.js';

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

app.post('/generatetext', async (req, res) => {
    const { message, prompt } = req.body;

    if (!message && !prompt) {
        return res.status(400).json({ error: 'Message or prompt is required' });
    }

    const text = message || prompt;

    const url = 'https://serger.onrender.com/generate';

    try {
        new URL(url);
    } catch (e) {
        return res.status(500).json({
            error: 'Invalid URL',
            details: 'The URL for the generate service is not valid.'
        });
    }

    try {
        const response = await axios.post(url, {
            prompt: text
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                error: 'Error connecting to the generate service',
                details: error.response?.data?.error || error.message
            });
        }
    }
});

app.route('/persona')
    .get((req, res) => {
        const jsonFilePath = path.join(__dirname, 'JSONS', 'personaData.json');
        fs.readFile(jsonFilePath, 'utf8', (error, data) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    return res.json({}); 
                }
                return res.status(500).json({ error: 'Error reading persona data' });
            }
            const personaData = JSON.parse(data);
            if (!personaData) {
                return res.status(404).json({ error: 'No persona data found' });
            }
            res.json(personaData);
        });
    })
    .post(express.json(), (req, res) => {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ error: 'Request body must be a non-empty object' });
        }

        const { Name, Description } = req.body;

        if (typeof Name !== 'string' || typeof Description !== 'string' || !Name || !Description) {
            return res.status(400).json({ error: 'Name and Description must be non-empty strings' });
        }

        const personaData = { Name, Description };
        const jsonFilePath = path.join(__dirname, 'JSONS', 'personaData.json');

        fs.mkdir(path.dirname(jsonFilePath), { recursive: true }, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error creating directory', details: err.message });
            }

            fs.writeFile(jsonFilePath, JSON.stringify(personaData, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error saving persona data to file', details: err.message });
                }
                res.status(200).json({ message: 'Persona data saved successfully' });
            });
        });
    });

app.route('/firstMessageAccepter')
    .post(express.json(), (req, res) => {
        const firstMessage = req.body.firstMessage;

        if (!firstMessage) {
            return res.status(400).json({ error: 'firstMessage must be provided' });
        }

        const personaData = { firstMessage: firstMessage };
        req.app.locals.firstMessageData = personaData;
        res.status(200).json({ message: 'First message overridden successfully' });
    })
    .get((req, res) => {
        const personaData = req.app.locals.firstMessageData;
        if (!personaData) {
            return res.status(404).json({ error: 'No first message data found' });
        }
        res.json(personaData);
    });

app.get('/first-message', (req, res) => {
    const personaData = req.app.locals.firstMessageData;
    if (!personaData) {
        return res.status(404).json({ error: 'No first message data found' });
    }
    if (personaData.firstMessage) {
        res.json({ message: personaData.firstMessage });
    } else {
        res.status(400).json({ error: 'Invalid data format: firstMessage not found' });
    }
});

app.post('/tags', async (req, res) => {
    try {
        const { tag } = req.body;
        if (!tag) {
            return res.status(400).json({ error: 'Tag is required' });
        }

        const tagsPath = path.join(__dirname, 'JSONS', 'tags.json');
        fs.mkdirSync(path.dirname(tagsPath), { recursive: true });

        let tags = [];
        try {
            const data = fs.readFileSync(tagsPath, 'utf8');
            tags = JSON.parse(data).tags;
        } catch (error) {
            tags = [];
        }

        if (!tags.includes(tag)) {
            tags.push(tag);
            fs.writeFileSync(tagsPath, JSON.stringify({ tags }, null, 2));

            const { error } = await supabase
                .from('tags')
                .insert([{ tag_name: tag }])
                .single();

            if (error) {
                if (error.code === '23505') {
                    return res.status(409).json({ error: 'Tag already exists in database' });
                }
                throw error;
            }
        }

        res.json({ message: 'Tag added successfully', tags });
    } catch (error) {
        res.status(500).json({ error: 'Error adding tag', details: error.message });
    }
});

app.get('/api/tags/get', async (req, res) => {
    try {
        const tagsPath = path.join(__dirname, 'JSONS', 'tags.json');
        
        let tags = [];
        try {
            const data = fs.readFileSync(tagsPath, 'utf8');
            tags = JSON.parse(data).tags;
        } catch (error) {
            fs.writeFileSync(tagsPath, JSON.stringify({ tags: [] }, null, 2));
        }

        res.json({ tags });
    } catch (error) {
        res.status(500).json({ error: 'Error getting tags', details: error.message });
    }
});

app.post('/import', async (req, res) => {
    try {
        const data = req.body;
        const response = await axios.post('https://jaagadg.onrender.com/import', data);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error importing data', details: error.message });
    }
});

app.get('/api/v1/server/checker/get', async (req, res) => {
    try {
        const checkerPath = path.join(__dirname, 'Public', 'JSONS', 'checker.json');
        
        if (!fs.existsSync(path.join(__dirname, 'Public', 'JSONS'))) {
            fs.mkdirSync(path.join(__dirname, 'Public', 'JSONS'), { recursive: true });
        }

        const data = fs.existsSync(checkerPath) ? 
            fs.readFileSync(checkerPath, 'utf8') : '{}';
        const encodedData = Buffer.from(data).toString('base64');
        
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        
        res.json({ success: true, data: encodedData });
    } catch (error) {
        res.status(500).json({ error: 'Error getting data', details: error.message });
    }
});

app.post('/api/v1/server/checker/post', async (req, res) => {
    try {
        const checkerPath = path.join(__dirname, 'Public', 'JSONS', 'checker.json');
        
        if (!fs.existsSync(path.join(__dirname, 'Public', 'JSONS'))) {
            fs.mkdirSync(path.join(__dirname, 'Public', 'JSONS'), { recursive: true });
        }

        fs.writeFileSync(checkerPath, JSON.stringify(req.body, null, 2));
        
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'POST');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error saving data', details: error.message });
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

app.post('/chats', async (req, res) => {
    try {
        const chatsPath = path.join(__dirname, 'Public', 'JSONS', 'chats.json');
        
        if (!fs.existsSync(path.join(__dirname, 'Public', 'JSONS'))) {
            fs.mkdirSync(path.join(__dirname, 'Public', 'JSONS'), { recursive: true });
        }

        let existingData = fs.existsSync(chatsPath) ? 
            JSON.parse(fs.readFileSync(chatsPath, 'utf8')) : [];

        if (!Array.isArray(existingData)) {
            existingData = [];
        }

        const uniqueMessages = new Map();
        const numberCounts = new Map();

        existingData.forEach(chat => {
            const key = `${chat.message}-${chat.sender}`;
            if (chat.number === "1ms") {
                numberCounts.set(key, (numberCounts.get(key) || 0) + 1);
            }
            if (!uniqueMessages.has(key) || 
                new Date(chat.timestamp) > new Date(uniqueMessages.get(key).timestamp)) {
                uniqueMessages.set(key, chat);
            }
        });

        const newKey = `${req.body.message}-${req.body.sender}`;
        if (req.body.number === "1ms") {
            numberCounts.set(newKey, (numberCounts.get(newKey) || 0) + 1);
        }
        if (!uniqueMessages.has(newKey) || 
            new Date(req.body.timestamp) > new Date(uniqueMessages.get(newKey).timestamp)) {
            uniqueMessages.set(newKey, req.body);
        }

        const deduplicatedData = Array.from(uniqueMessages.values()).filter(chat => {
            const key = `${chat.message}-${chat.sender}`;
            return chat.number !== "1ms" || numberCounts.get(key) !== 2;
        });

        fs.writeFileSync(chatsPath, JSON.stringify(deduplicatedData, null, 2));

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error saving chat data', details: error.message });
    }
});

app.get('/chats/api/get', async (req, res) => {
    try {
        const chatsPath = path.join(__dirname, 'Public', 'JSONS', 'chats.json');
        
        if (!fs.existsSync(chatsPath)) {
            return res.json([]);
        }

        const data = fs.readFileSync(chatsPath, 'utf8');
        const chats = JSON.parse(data);
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Error getting chat data', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
});