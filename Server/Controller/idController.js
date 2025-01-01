import fs from 'fs';
import path from 'path';

// Define the file path for storing the character ID data
const filePath = path.join(__dirname, 'Public', 'JSONS', 'characterId.json');

// Store character ID data
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
