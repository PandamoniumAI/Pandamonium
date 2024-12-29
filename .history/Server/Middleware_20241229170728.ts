 express = require('express');
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

