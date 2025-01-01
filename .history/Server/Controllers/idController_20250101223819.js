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


const filePath = path.join(__dirname, 'Public', 'JSONS', 'characterId.json');

export const storeCharacterId = async (characterId) => {
    try {
        if (!characterId) {
            throw new Error('Character ID is required');
        }

        const dataToStore = {
            characterId,
            timestamp: Date.now()
        };

        await fs.promises.writeFile(filePath, JSON.stringify(dataToStore, null, 2), 'utf8');
        return dataToStore;
    } catch (error) {
        throw new Error('Error storing data: ' + error.message);
    }
};

// Retrieve the character ID data
export const getCharacterId = async () => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error('Character ID file not found');
        }

        const data = fs.readFileSync(filePath, 'utf8');

        if (!data || data.trim() === '') {
            throw new Error('Character ID data is empty');
        }

        let storedData;
        try {
            storedData = JSON.parse(data);
        } catch (parseError) {
            throw new Error('Invalid character ID data format');
        }

        if (storedData && typeof storedData.characterId === 'number') {
            return storedData.characterId;
        } else {
            throw new Error('Invalid character ID format');
        }
    } catch (error) {
        throw new Error('Error retrieving character ID: ' + error.message);
    }
};
