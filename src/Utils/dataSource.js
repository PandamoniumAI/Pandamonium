import { API_ENDPOINTS } from '../config/api.config.js';

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
  generate: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GENERATE, {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("Error generating:", error);
      throw error;
    }
  }
};