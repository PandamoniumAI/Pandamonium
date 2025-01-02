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
} from '../Utils/serverUtils.js';

// ES module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chatsPath = path.join(__dirname, 'Public', 'JSONS', 'chats.json');

export const saveChat = async (chatData) => {
    try {
        const chatsDirectory = path.join(__dirname, 'Public', 'JSONS');

        // Ensure the directory exists
        if (!fs.existsSync(chatsDirectory)) {
            fs.mkdirSync(chatsDirectory, { recursive: true });
        }

        let existingData = [];
        if (fs.existsSync(chatsPath)) {
            const rawData = fs.readFileSync(chatsPath, 'utf8');
            existingData = JSON.parse(rawData);
        }

        const uniqueMessages = new Map();
        const numberCounts = new Map();

        // Process existing data
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

        // Process new data
        const newKey = `${chatData.message}-${chatData.sender}`;
        if (chatData.number === "1ms") {
            numberCounts.set(newKey, (numberCounts.get(newKey) || 0) + 1);
        }
        if (!uniqueMessages.has(newKey) || 
            new Date(chatData.timestamp) > new Date(uniqueMessages.get(newKey).timestamp)) {
            uniqueMessages.set(newKey, chatData);
        }

        // Deduplicate data
        const deduplicatedData = Array.from(uniqueMessages.values()).filter(chat => {
            const key = `${chat.message}-${chat.sender}`;
            return chat.number !== "1ms" || numberCounts.get(key) !== 2;
        });

        // Write updated data to file
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
