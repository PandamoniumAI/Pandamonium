export app.post('/reason', async (req, res) => {
    const { reason_text } = req.body;

    if (!reason_text) {
        return res.status(400).json({ error: 'Reason text is required' });
    }

    const { data, error } = await supabase
        .from('reasons')
        .insert([{ reason_text }])
        .select();

    if (error) {
        return res.status(500).json({ error: 'Error saving reason', details: error.message });
    }

    res.status(201).json({ message: 'Reason saved successfully', data: data[0] });
});
