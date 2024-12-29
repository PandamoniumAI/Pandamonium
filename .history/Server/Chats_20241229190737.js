import '../Server/'
app.post('/chats', async (req, res) => {
    try {
        const chatsPath = path.join(__dirname, 'Public', 'JSONS', 'chats.json');
        
        if (!fs.existsSync(path.join(__dirname, 'Public', 'JSONS'))) {
            fs.mkdirSync(path.join(__dirname, 'Public', 'JSONS'), { recursive: true });
        }

        let existingData = fs.existsSync(chatsPath) ? 
            JSON.parse(fs.readFileSync(chatsPath, 'utf8')) : [];

        if (!Array.isArray(existingData)) {
            existingData = [];
        }

        const uniqueMessages = new Map();
        const numberCounts = new Map();

        existingData.forEach(chat => {
            const key = `${chat.message}-${chat.sender}`;
            if (chat.number === "1ms") {
                numberCounts.set(key, (numberCounts.get(key) || 0) + 1);
            }
            if (!uniqueMessages.has(key) || 
                new Date(chat.timestamp) > new Date(uniqueMessages.get(key).timestamp)) {
                uniqueMessages.set(key, chat);
            }
        });

        const newKey = `${req.body.message}-${req.body.sender}`;
        if (req.body.number === "1ms") {
            numberCounts.set(newKey, (numberCounts.get(newKey) || 0) + 1);
        }
        if (!uniqueMessages.has(newKey) || 
            new Date(req.body.timestamp) > new Date(uniqueMessages.get(newKey).timestamp)) {
            uniqueMessages.set(newKey, req.body);
        }

        const deduplicatedData = Array.from(uniqueMessages.values()).filter(chat => {
            const key = `${chat.message}-${chat.sender}`;
            return chat.number !== "1ms" || numberCounts.get(key) !== 2;
        });

        fs.writeFileSync(chatsPath, JSON.stringify(deduplicatedData, null, 2));

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error saving chat data', details: error.message });
    }
});

app.get('/chats/api/get', async (req, res) => {
    try {
        const chatsPath = path.join(__dirname, 'Public', 'JSONS', 'chats.json');
        
        if (!fs.existsSync(chatsPath)) {
            return res.json([]);
        }

        const data = fs.readFileSync(chatsPath, 'utf8');
        const chats = JSON.parse(data);
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Error getting chat data', details: error.message });
    }
});