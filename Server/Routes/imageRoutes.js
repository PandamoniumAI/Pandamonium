import express from 'express';
import { shortenImage } from '../controllers/imageController.js';

const router = express.Router();

// Route to shorten the image
router.post('/shorten', express.json(), async (req, res) => {
    try {
        const { image, name, description } = req.body;

        // Call the shortenImage function from the controller
        const shortenedData = shortenImage(image, name, description);
        
        // Respond with the shortened image data
        res.json(shortenedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
