import express from 'express';
import { generateText, getPersonaData, savePersonaData, setFirstMessage, getFirstMessage } from '../Controllers/personaController.js';

const router = express.Router();

// Route to generate text
router.post('/generatetext', async (req, res) => {
    const { message, prompt } = req.body;

    if (!message && !prompt) {
        return res.status(400).json({ error: 'Message or prompt is required' });
    }

    try {
        const response = await generateText(message, prompt);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get and save persona data
router.route('/persona')
    .get(async (req, res) => {
        try {
            const personaData = await getPersonaData();
            res.json(personaData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .post(express.json(), async (req, res) => {
        const { Name, Description } = req.body;

        if (typeof Name !== 'string' || typeof Description !== 'string' || !Name || !Description) {
            return res.status(400).json({ error: 'Name and Description must be non-empty strings' });
        }

        try {
            const personaData = { Name, Description };
            await savePersonaData(personaData);
            res.status(200).json({ message: 'Persona data saved successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

// Route to get and set the first message
router.route('/firstMessageAccepter')
    .post(express.json(), (req, res) => {
        const { firstMessage } = req.body;

        if (!firstMessage) {
            return res.status(400).json({ error: 'firstMessage must be provided' });
        }

        try {
            const message = setFirstMessage(firstMessage, req.app);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .get((req, res) => {
        try {
            const firstMessage = getFirstMessage(req.app);
            res.json({ message: firstMessage });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

// Route to get the first message
router.get('/first-message', (req, res) => {
    try {
        const firstMessage = getFirstMessage(req.app);
        res.json({ message: firstMessage });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
