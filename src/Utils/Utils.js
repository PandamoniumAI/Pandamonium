import { ds } from "./dataSource";
export const FetchCharacters = async () => {
  const response = await ds.get("https://server-hhcx.onrender.com/characters");
  console.log("Response:", response);
  if (response.status != 200) {
    return [];
  } else {
    const base64String = response.data.data
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const paddedBase64String = base64String.padEnd(
      base64String.length + ((4 - (base64String.length % 4)) % 4),
      "=",
    );
    const decodedData = JSON.parse(atob(paddedBase64String));

    console.log("Decoded Data:", decodedData);

    decodedData.forEach((character, index) => {
      console.log(`Character ${index + 1}:`, character);
    });
    if (decodedData.length > 0) {
      return decodedData;
    }
  }
};
