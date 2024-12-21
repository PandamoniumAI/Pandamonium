export async function saveMessage(requesterData) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const parsedData = parseRequesterData(requesterData);
    console.log('Sending data to API:', parsedData);
    try {
        const response = await fetch('https://api.com/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: parsedData }),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const result = await response.json();
        return { data: result };
    } catch (error) {
        console.error('Error sending data to API:', error);
        throw error;
    }
}

function parseRequesterData(data) {
    const { id, characterMessage, userMessage } = data;
    return {
        id,
        data: {
            characterMessage,
            userMessage
        }
    };
}
