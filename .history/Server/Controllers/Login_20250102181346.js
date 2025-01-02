import { 
    express,
    cors,
    axios,
    dotenv,
    bcrypt,
    rateLimit,
    Joi,
    jwt,
    bodyParser,
    authRoutes,
    characterRoutes,
    reasonRoutes,
    imageRoutes,
    tagRoutes,
    chatRoutes,
    personaRoutes,
    idRoutes
} from '../Utils/serverUtils.js';

import { SUPABASE_URL, SUPABASE_KEY } from '../Datastore/Supabase';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).required()
});

export const registerUser = async (req, res) => {
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
};

export const loginUser = async (req, res) => {
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

    const token = jwt.sign({ userId: data.id, timestamp: Date.now() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, userId: data.id });
};

export const logoutUser = async (req, res) => {
    const { userId } = req.body;

    const { error: userError } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

    if (userError) {
        return res.status(500).json({ error: 'Error logging out user' });
    }

    res.status(200).json({ message: 'Logged out successfully' });
};
