
export const shortenImage = (image, name, description) => {
    try {
        const base64Data = image.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64'); 
        const imageSize = buffer.length;

        if (imageSize > 12400) {
            throw new Error('Image too large');
        }

        const shortenedData = {
            name,
            description,
            image: base64Data
        };

        return shortenedData;
    } catch (error) {
        throw new Error('Error shortening image: ' + error.message);
    }
};
