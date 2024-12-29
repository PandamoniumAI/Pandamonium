const { createClient } = require('@supabase/supabase-js');
import { express, app, jwt, Joi, bcrypt,   } from './Middleware.js';

const SUPABASE_URL = 'https://dojdyydsanxoblgjmzmq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvamR5eWRzYW54b2JsZ2ptem1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMDUxNTQsImV4cCI6MjA0ODg4MTE1NH0.mONIXEuP2lF7Hu9J34D9f4yQWuFuPTC5tE-rpbAJTxg';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).required()
});

app.post('/register', async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send('Name and password are required');
    }

    const sanitizedName = name.trim();
    const sanitizedPassword = password.trim();

    const { data, error: insertError } = await supabase
        .from('users')
        .insert([{ name: sanitizedName, password: sanitizedPassword }]);

    if (insertError) {
        return res.status(500).send('Error registering user');
    }

    res.status(201).json({ message: 'User registered successfully', user: { name: sanitizedName } });
});

app.post('/login', loginLimiter, async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send('Name and password are required');
    }

    const sanitizedName = name.trim();
    const sanitizedPassword = password.trim();

    const { data, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('name', sanitizedName)
        .eq('password', sanitizedPassword)
        .single();

    if (selectError || !data) {
        return res.status(401).send('Invalid name or password');
    }

    if (sanitizedPassword !== data.password && !bcrypt.compareSync(sanitizedPassword, data.password)) {
        return res.status(401).send('Invalid name or password');
    }

    const token = jwt.sign({ userId: data.id, timestamp: Date.now() }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, userId: data.id });
});

app.post('/logout', async (req, res) => {
    const { userId } = req.body;

    const { error: userError } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

    if (userError) {
        return res.status(500).json({ error: 'Error logging out user' });
    }

    res.status(200).json({ message: 'Logged out successfully' });
});