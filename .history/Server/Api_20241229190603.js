const filePath = path.join('Public', 'JSONS', 'id.json');

app.post('/api/id', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is empty' });
        }

        const dataToStore = {
            characterId: req.body.characterId,
            timestamp: Date.now()
        };

        await fs.promises.writeFile(filePath, JSON.stringify(dataToStore, null, 2), 'utf8');
        res.status(200).json({ message: 'Data stored successfully', data: dataToStore });

    } catch (error) {
        res.status(500).json({ error: 'Error storing data', details: error.message });
    }
});

app.get('/api/id/get', (req, res) => {
    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Character ID file not found' });
        }

        const data = fs.readFileSync(filePath, 'utf8');
        
        if (!data || data.trim() === '') {
            return res.status(404).json({ error: 'Character ID data is empty' });
        }

        let storedData;
        try {
            storedData = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).json({ error: 'Invalid character ID data format' });
        }
        
        if (storedData && typeof storedData.characterId === 'number') {
            return res.status(200).json({ characterId: storedData.characterId });
        } else {
            return res.status(404).json({ error: 'Invalid character ID format' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error reading character ID', details: error.message });
    }
});

app.get('/api/tags/get', async (req, res) => {
    try {
        const tagsPath = path.join(__dirname, 'JSONS', 'tags.json');
        
        let tags = [];
        try {
            const data = fs.readFileSync(tagsPath, 'utf8');
            tags = JSON.parse(data).tags;
        } catch (error) {
            fs.writeFileSync(tagsPath, JSON.stringify({ tags: [] }, null, 2));
        }

        res.json({ tags });
    } catch (error) {
        res.status(500).json({ error: 'Error getting tags', details: error.message });
    }
});