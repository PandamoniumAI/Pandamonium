export const FetchCharacters = async () => {
  try {
    const response = await fetch("https://server-hhcx.onrender.com/characters");
    console.log("Response:", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.data) {
      throw new Error('Data is not in the expected format');
    }
    const base64String = data.data
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const paddedBase64String = base64String.padEnd(
      base64String.length + ((4 - (base64String.length % 4)) % 4),
      "="
    );
    const decodedData = JSON.parse(atob(paddedBase64String));

    console.log("Decoded Data:", decodedData);

    decodedData.forEach((character, index) => {
      console.log(`Character ${index + 1}:`, character);
    });
    
    return decodedData.length > 0 ? decodedData : [];
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};
