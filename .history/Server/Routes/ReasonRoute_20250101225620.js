import express from 'express';
import { insertReason } from '../ControllersreasonController.js';

const router = express.Router();

router.post('/reason', async (req, res) => {
    const { reason_text } = req.body;

    if (!reason_text) {
        return res.status(400).json({ error: 'Reason text is required' });
    }

    try {
        const insertedReason = await insertReason(reason_text);
        return res.status(201).json({ message: 'Reason saved successfully', data: insertedReason });
    } catch (error) {
        return res.status(500).json({ error: 'Error saving reason', details: error.message });
    }
});

export default router;
