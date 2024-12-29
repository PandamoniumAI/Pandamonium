app.route('/persona')
    .get((req, res) => {
        const jsonFilePath = path.join(__dirname, 'JSONS', 'personaData.json');
        fs.readFile(jsonFilePath, 'utf8', (error, data) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    return res.json({}); 
                }
                return res.status(500).json({ error: 'Error reading persona data' });
            }
            const personaData = JSON.parse(data);
            if (!personaData) {
                return res.status(404).json({ error: 'No persona data found' });
            }
            res.json(personaData);
        });
    })
    .post(express.json(), (req, res) => {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ error: 'Request body must be a non-empty object' });
        }

        const { Name, Description } = req.body;

        if (typeof Name !== 'string' || typeof Description !== 'string' || !Name || !Description) {
            return res.status(400).json({ error: 'Name and Description must be non-empty strings' });
        }

        const personaData = { Name, Description };
        const jsonFilePath = path.join(__dirname, 'JSONS', 'personaData.json');

        fs.mkdir(path.dirname(jsonFilePath), { recursive: true }, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error creating directory', details: err.message });
            }

            fs.writeFile(jsonFilePath, JSON.stringify(personaData, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error saving persona data to file', details: err.message });
                }
                res.status(200).json({ message: 'Persona data saved successfully' });
            });
        });
    });