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
  
const chatsPath = path.join(__dirname, 'Public', 'JSONS', 'chats.json');

export const saveChat = async (chatData) => {
    try {
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

        const newKey = `${chatData.message}-${chatData.sender}`;
        if (chatData.number === "1ms") {
            numberCounts.set(newKey, (numberCounts.get(newKey) || 0) + 1);
        }
        if (!uniqueMessages.has(newKey) || 
            new Date(chatData.timestamp) > new Date(uniqueMessages.get(newKey).timestamp)) {
            uniqueMessages.set(newKey, chatData);
        }

        const deduplicatedData = Array.from(uniqueMessages.values()).filter(chat => {
            const key = `${chat.message}-${chat.sender}`;
            return chat.number !== "1ms" || numberCounts.get(key) !== 2;
        });

        fs.writeFileSync(chatsPath, JSON.stringify(deduplicatedData, null, 2));
        return { success: true };
    } catch (error) {
        throw new Error('Error saving chat data: ' + error.message);
    }
};

export const getChats = async () => {
    try {
        if (!fs.existsSync(chatsPath)) {
            return [];
        }

        const data = fs.readFileSync(chatsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error getting chat data: ' + error.message);
    }
};
