app.post('/tags', async (req, res) => {
    try {
        const { tag } = req.body;
        if (!tag) {
            return res.status(400).json({ error: 'Tag is required' });
        }

        const tagsPath = path.join(__dirname, 'JSONS', 'tags.json');
        fs.mkdirSync(path.dirname(tagsPath), { recursive: true });

        let tags = [];
        try {
            const data = fs.readFileSync(tagsPath, 'utf8');
            tags = JSON.parse(data).tags;
        } catch (error) {
            tags = [];
        }

        if (!tags.includes(tag)) {
            tags.push(tag);
            fs.writeFileSync(tagsPath, JSON.stringify({ tags }, null, 2));

            const { error } = await supabase
                .from('tags')
                .insert([{ tag_name: tag }])
                .single();

            if (error) {
                if (error.code === '23505') {
                    return res.status(409).json({ error: 'Tag already exists in database' });
                }
                throw error;
            }
        }

        res.json({ message: 'Tag added successfully', tags });
    } catch (error) {
        res.status(500).json({ error: 'Error adding tag', details: error.message });
    }
});
