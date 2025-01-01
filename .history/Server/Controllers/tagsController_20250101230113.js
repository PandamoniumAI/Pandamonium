import { 
    express,
    supabase,
    cors,
    path,
    axios,
    fs,
    dotenv,
    cron,
    fileURLToPath,
    sanitize,
    bcrypt,
    rateLimit,
    Joi,
    jwt,
    cheerio,
    bodyParser,
    authRoutes,
    characterRoutes,
    reasonRoutes,
    imageRoutes,
    tagRoutes,
    chatRoutes,
    personaRoutes,
    idRoutes
  } from './Utils/serverUtils.js';

const tagsPath = path.join(__dirname, 'Public', 'JSONS', 'tags.json');

export const addTag = async (tag) => {
    try {
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
                    throw new Error('Tag already exists in database');
                }
                throw error;
            }
        }

        return tags;
    } catch (error) {
        throw new Error('Error adding tag: ' + error.message);
    }
};

export const getTags = async () => {
    try {
        let tags = [];
        try {
            const data = fs.readFileSync(tagsPath, 'utf8');
            tags = JSON.parse(data).tags;
        } catch (error) {
            fs.writeFileSync(tagsPath, JSON.stringify({ tags: [] }, null, 2));
        }
        return tags;
    } catch (error) {
        throw new Error('Error getting tags: ' + error.message);
    }
};

export const importData = async (data) => {
    try {
        const response = await axios.post('https://jaagadg.onrender.com/import', data);
        return response.data;
    } catch (error) {
        throw new Error('Error importing data: ' + error.message);
    }
};

export const getCheckerData = async () => {
    try {
        const checkerPath = path.join(__dirname, 'Public', 'JSONS', 'checker.json');

        if (!fs.existsSync(path.join(__dirname, 'Public', 'JSONS'))) {
            fs.mkdirSync(path.join(__dirname, 'Public', 'JSONS'), { recursive: true });
        }

        const data = fs.existsSync(checkerPath) ? 
            fs.readFileSync(checkerPath, 'utf8') : '{}';
        
        return Buffer.from(data).toString('base64');
    } catch (error) {
        throw new Error('Error getting checker data: ' + error.message);
    }
};

export const saveCheckerData = async (data) => {
    try {
        const checkerPath = path.join(__dirname, 'Public', 'JSONS', 'checker.json');

        if (!fs.existsSync(path.join(__dirname, 'Public', 'JSONS'))) {
            fs.mkdirSync(path.join(__dirname, 'Public', 'JSONS'), { recursive: true });
        }

        fs.writeFileSync(checkerPath, JSON.stringify(data, null, 2));

        return { success: true };
    } catch (error) {
        throw new Error('Error saving checker data: ' + error.message);
    }
};
