import express from 'express';
import { addTag, getTags, importData, getCheckerData, saveCheckerData } from '../Controllers/tagsController.js';

const router = express.Router();

router.post('/tags', async (req, res) => {
    try {
        const { tag } = req.body;
        if (!tag) {
            return res.status(400).json({ error: 'Tag is required' });
        }

        const tags = await addTag(tag);
        res.json({ message: 'Tag added successfully', tags });
    } catch (error) {
        res.status(500).json({ error: 'Error adding tag', details: error.message });
    }
});

router.get('/api/tags/get', async (req, res) => {
    try {
        const tags = await getTags();
        res.json({ tags });
    } catch (error) {
        res.status(500).json({ error: 'Error getting tags', details: error.message });
    }
});

router.post('/import', async (req, res) => {
    try {
        const data = req.body;
        const response = await importData(data);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error importing data', details: error.message });
    }
});

router.get('/api/v1/server/checker/get', async (req, res) => {
    try {
        const encodedData = await getCheckerData();
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.json({ success: true, data: encodedData });
    } catch (error) {
        res.status(500).json({ error: 'Error getting data', details: error.message });
    }
});

router.post('/api/v1/server/checker/post', async (req, res) => {
    try {
        const response = await saveCheckerData(req.body);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'POST');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error saving data', details: error.message });
    }
});

export default router;
