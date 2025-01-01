import express from 'express';
import { saveChat, getChats } from '../Middleware/Chat.js';

const router = express.Router();

// Route to save chat data
router.post('/chats', async (req, res) => {
    try {
        const chatData = req.body;

        if (!chatData || Object.keys(chatData).length === 0) {
            return res.status(400).json({ error: 'Chat data is required' });
        }

        const result = await saveChat(chatData);
        res.status(201).json(result); // 201 status for successful creation
    } catch (error) {
        res.status(500).json({ error: 'Error saving chat data', details: error.message });
    }
});

// Route to get chat data
router.get('/chats/api/get', async (req, res) => {
    try {
        const chats = await getChats();
        res.status(200).json(chats); // 200 status for successful retrieval
    } catch (error) {
        res.status(500).json({ error: 'Error getting chat data', details: error.message });
    }
});

export default router;
