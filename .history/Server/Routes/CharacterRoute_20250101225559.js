import express from 'express';
import { insertCharacter, getAllCharacters } from '../Controllers/Character.js';

const router = express.Router();

router.post('/charactersdata', async (req, res) => {
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

router.get('/characterdata/id', async (req, res) => {
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

router.post('/create', async (req, res) => {
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

router.get('/characters', async (req, res) => {
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

export default router;
