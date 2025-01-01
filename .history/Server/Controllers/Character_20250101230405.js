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
  } from '../serverUtils.js';

import fs from 'fs';

export const insertCharacter = async (characterData) => {
    const { data, error } = await supabase
        .from('characters')
        .insert([{
            name: characterData.name,
            photo: characterData.photo,
            description: characterData.description,
            modelInstructions: characterData.modelInstructions || null,
            firstMessage: characterData.firstMessage || null,
            system: characterData.system,
            tag: characterData.tag,
            persona: characterData.persona
        }])
        .select();

    if (error) {
        throw new Error("Error saving character data: " + error.message);
    }

    if (!data || data.length === 0) {
        throw new Error("No data returned after insert");
    }

    return data[0];
};

export const getAllCharacters = async () => {
    const { data, error } = await supabase
        .from('characters')
        .select('*');

    if (error) {
        throw new Error("Error fetching characters: " + error.message);
    }

    if (!data) {
        return [];
    }

    return data;
};
