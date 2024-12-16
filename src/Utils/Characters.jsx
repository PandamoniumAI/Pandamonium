async function FetchCharacters() {
    try {
      console.log("Fetching characters...");
  
      const response = await fetch('https://server-hhcx.onrender.com/characters');
      if (!response.ok) throw new Error("Network response was not ok");
  
      const data = await response.json();
      console.log("Fetched data:", data);
  
      const base64String = data.data.replace(/-/g, "+").replace(/_/g, "/");
      const paddedBase64String = base64String.padEnd(
        base64String.length + ((4 - (base64String.length % 4)) % 4),
        "=",
      );
  
      console.log("Base64 string padded:", paddedBase64String);
  
      const decodedData = JSON.parse(atob(paddedBase64String));
      console.log("Decoded data:", decodedData);
  
      const uniqueCharacters = [];
      const seenIds = new Set();
  
      for (let character of decodedData) {
        if (!seenIds.has(character.id)) {
          uniqueCharacters.push(character);
          seenIds.add(character.id);
          console.log("Fetched character:", character);
        }
      }
  
      console.log("Unique characters fetched one at a time:", uniqueCharacters);
      return uniqueCharacters;
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  }
  
  export { FetchCharacters };
  