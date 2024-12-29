import { API_ENDPOINTS } from "../config/api.config.js";

export const CharacterId = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.CHARACTER_ID, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating character ID:", error);
    throw error;
  }
};

export const getMessages = async (characterId, chatId) => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.GET_MESSAGES}${characterId}/${chatId}`,
      {
        method: "GET",
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
};

export const GetCharacterId = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.GET_CHARACTER_ID, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error("Error getting character ID:", error);
    throw error;
  }
};

export const GetCharacterdata = async (id) => {
  try {
    if (!id || isNaN(parseInt(id))) {
      throw new Error("Invalid or undefined character ID");
    }
    const response = await fetch(`${API_ENDPOINTS.GET_CHARACTER_DATA}${id}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error("Error getting character data:", error);
    throw error;
  }
};
export const Api = {
  generate: async (prompt) => {
    try {
      const response = await fetch(API_ENDPOINTS.GENERATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error generating:", error);
      throw error;
    }
  },
};
