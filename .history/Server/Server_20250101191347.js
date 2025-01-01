const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
const cron = require('node-cron');
require('dotenv').config();
const { fileURLToPath } = require('url');
const sanitize = require('sanitize-html');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
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

app.get('/ping', (req, res) => {
    console.log('Ping received');
    res.send('Pong');
});

const SUPABASE_URL = 'https://dojdyydsanxoblgjmzmq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvamR5eWRzYW54b2JsZ2ptem1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMDUxNTQsImV4cCI6MjA0ODg4MTE1NH0.mONIXEuP2lF7Hu9J34D9f4yQWuFuPTC5tE-rpbAJTxg';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).required()
});

app.post('/register', async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send('Name and password are required');
    }

    const sanitizedName = name.trim();
    const sanitizedPassword = password.trim();

    const { data, error: insertError } = await supabase
        .from('users')
        .insert([{ name: sanitizedName, password: sanitizedPassword }]);

    if (insertError) {
        return res.status(500).send('Error registering user');
    }

    res.status(201).json({ message: 'User registered successfully', user: { name: sanitizedName } });
});

app.post('/login', loginLimiter, async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send('Name and password are required');
    }

    const sanitizedName = name.trim();
    const sanitizedPassword = password.trim();

    const { data, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('name', sanitizedName)
        .eq('password', sanitizedPassword)
        .single();

    if (selectError || !data) {
        return res.status(401).send('Invalid name or password');
    }

    if (sanitizedPassword !== data.password && !bcrypt.compareSync(sanitizedPassword, data.password)) {
        return res.status(401).send('Invalid name or password');
    }

    const token = jwt.sign({ userId: data.id, timestamp: Date.now() }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, userId: data.id });
});

app.post('/logout', async (req, res) => {
    const { userId } = req.body;

    const { error: userError } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

    if (userError) {
        return res.status(500).json({ error: 'Error logging out user' });
    }

    res.status(200).json({ message: 'Logged out successfully' });
});

app.post('/reason', async (req, res) => {
    const { reason_text } = req.body;

    if (!reason_text) {
        return res.status(400).json({ error: 'Reason text is required' });
    }

    const { data, error } = await supabase
        .from('reasons')
        .insert([{ reason_text }])
        .select();

    if (error) {
        return res.status(500).json({ error: 'Error saving reason', details: error.message });
    }

    res.status(201).json({ message: 'Reason saved successfully', data: data[0] });
});

const insertCharacter = async (characterData) => {
    const { data, error } = await supabase
        .from('characters')
        .insert([{
            name: characterData.name,
            photo: characterData.photo,
            description: characterData.description,
            modelInstructions: characterData.modelInstructions || null,
            firstMessage: characterData.firstMessage || null,
            system: characterData.system,
            tag: characterData.tag,
            persona: characterData.persona
        }])
        .select();

    if (error) {
        throw new Error("Error saving character data: " + error.message);
    }

    if (!data || data.length === 0) {
        throw new Error("No data returned after insert");
    }

    return data[0];
};

const getAllCharacters = async () => {
    const { data, error } = await supabase
        .from('characters')
        .select('*');

    if (error) {
        throw new Error("Error fetching characters: " + error.message);
    }

    if (!data) {
        return [];
    }

    return data;
};

app.post('/charactersdata', async (req, res) => {
    const payload = req.body;
    const requiredFields = ['name', 'photo', 'description', 'modelInstructions', 'firstMessage', 'system', 'tag', 'persona'];

    if (!requiredFields.every(field => payload.hasOwnProperty(field))) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const insertedCharacter = await insertCharacter(payload);
        return res.status(201).json({ message: 'Character added successfully!', character: insertedCharacter });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

app.get('/characterdata/id', async (req, res) => {
    const characterId = req.query.id;

    if (!characterId || isNaN(characterId)) {
        return res.status(400).json({ error: "invalid input syntax for type integer: \"undefined\"" });
    }

    try {
        const { data, error } = await supabase
            .from('characters')
            .select('*')
            .eq('id', characterId);

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Character not found' });
        }

        if (data.length > 1) {
            return res.status(500).json({ error: 'Multiple characters found with same ID' });
        }

        const base64Data = Buffer.from(JSON.stringify(data[0])).toString('base64');
        res.status(200).json({ data: base64Data });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/create', async (req, res) => {
    try {
        const { name, photo, description, modelInstructions, system, tag, firstMessage, persona } = req.body;

        if (!name || !description || !modelInstructions || !system || !tag || !firstMessage || !persona) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        const characterData = {
            name,
            photo: photo || '',
            description: description.substring(0, 15000),
            modelInstructions: modelInstructions.substring(0, 15000), 
            system: system.substring(0, 15000),
            tag,
            persona: persona.substring(0, 15000),
            firstMessage: firstMessage.substring(0, 15000)
        };

        const insertedCharacter = await insertCharacter(characterData);

        res.status(200).json({
            message: 'Data saved successfully',
            data: insertedCharacter
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error saving character data',
            details: error.message
        });
    }
});


app.get('/characters', async (req, res) => {
    try {
        if (req.method !== 'GET') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        const characters = await getAllCharacters();
        if (!characters || characters.length === 0) {
            return res.status(404).json({ error: 'No characters found' });
        }

        const validData = characters.filter(character => {
            return character
                && typeof character.id === 'number'
                && typeof character.name === 'string'
                && (typeof character.photo === 'string' || typeof character.photo === 'number')
                && typeof character.description === 'string'
                && typeof character.modelInstructions === 'string'
                && typeof character.system === 'string'
                && typeof character.tag === 'string'
                && typeof character.persona === 'string'
                && (typeof character.firstMessage === 'string' || character.firstMessage === undefined);
        });

        fs.writeFileSync('Public/JSONS/character.json', JSON.stringify(validData, null, 2));
        
        const base64Data = Buffer.from(JSON.stringify(validData)).toString('base64');
        return res.status(200).json({ data: base64Data });

    } catch (error) {
        res.status(500).json({
            error: 'Error fetching character data',
            details: error.message
        });
    }
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