import express from 'express';
import path from 'path';  // Missing import for path module
import { storeCharacterId, getCharacterId } from '../Controllers/idController.js';

const router = express.Router();
const filePath = path.join('Public', 'JSONS', 'id.json');

// Route to store character ID
router.post('/api/id', express.json(), async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is empty' });
        }

        const { characterId } = req.body;
        if (!characterId) {
            return res.status(400).json({ error: 'Character ID is required' });
        }

        const dataToStore = await storeCharacterId(characterId);
        res.status(200).json({ message: 'Data stored successfully', data: dataToStore });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get stored character ID
router.get('/api/id/get', async (req, res) => {
    try {
        const characterId = await getCharacterId();
        res.status(200).json({ characterId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
