import express from 'express';
import { saveChat, getChats } from '../';

const router = express.Router();

router.post('/chats', async (req, res) => {
    try {
        const chatData = req.body;
        const result = await saveChat(chatData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error saving chat data', details: error.message });
    }
});

router.get('/chats/api/get', async (req, res) => {
    try {
        const chats = await getChats();
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Error getting chat data', details: error.message });
    }
});

export default router;
