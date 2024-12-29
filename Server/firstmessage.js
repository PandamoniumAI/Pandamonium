app.route('/firstMessageAccepter')
    .post(express.json(), (req, res) => {
        const firstMessage = req.body.firstMessage;

        if (!firstMessage) {
            return res.status(400).json({ error: 'firstMessage must be provided' });
        }

        const personaData = { firstMessage: firstMessage };
        req.app.locals.firstMessageData = personaData;
        res.status(200).json({ message: 'First message overridden successfully' });
    })
    .get((req, res) => {
        const personaData = req.app.locals.firstMessageData;
        if (!personaData) {
            return res.status(404).json({ error: 'No first message data found' });
        }
        res.json(personaData);
    });

app.get('/first-message', (req, res) => {
    const personaData = req.app.locals.firstMessageData;
    if (!personaData) {
        return res.status(404).json({ error: 'No first message data found' });
    }
    if (personaData.firstMessage) {
        res.json({ message: personaData.firstMessage });
    } else {
        res.status(400).json({ error: 'Invalid data format: firstMessage not found' });
    }
});

