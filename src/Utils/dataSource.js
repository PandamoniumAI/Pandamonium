export const CharacterId = async () => {
  try {
    const response = await fetch("https://server-hhcx.onrender.com/api/id", {
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
    const response = await fetch("https://server-hhcx.onrender.com/api/id/get", {
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
    const response = await fetch(`https://server-hhcx.onrender.com/characterdata/id?id=${id}`, {
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
      const response = await fetch("https://serverv32.onrender.com/generate", {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("Error generating:", error);
      throw error;
    }
  }
};