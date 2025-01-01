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
  } from '../Utils/serverUtils.js';

export const insertReason = async (reasonText) => {
    const { data, error } = await supabase
        .from('reasons')
        .insert([{ reason_text: reasonText }])
        .select();

    if (error) {
        throw new Error("Error saving reason: " + error.message);
    }

    return data[0];
};
