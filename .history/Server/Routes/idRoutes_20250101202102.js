import express from 'express';
import { storeCharacterId, getCharacterId } from '../controllers/idController.js';

const router = express.Router();

// Route to store the character ID
router.post('/api/id', express.json(), async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is empty' });
        }

        const { characterId } = req.body;
        const dataToStore = await storeCharacterId(characterId);
        
        res.status(200).json({ message: 'Data stored successfully', data: dataToStore });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get the character ID
router.get('/api/id/get', async (req, res) => {
    try {
        const characterId = await getCharacterId();
        res.status(200).json({ characterId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
