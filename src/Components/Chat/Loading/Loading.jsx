import React, { useEffect, useState } from "react";
import { GetCharacterdata } from "../../../Utils/dataSource";

export default function Loading({ id }) {  // Receiving 'id' as a prop
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCharacterData = async () => {
    const characterAvatar = document.getElementById("characterAvatar");
    const loadingOverlay = document.getElementById("loading-overlay");
    
    const handleAvatarClick = () => {
      const overlay = document.getElementById("characterOverlay");
      if (overlay) {
        overlay.style.display = "block";
      }
    };

    if (characterAvatar) {
      characterAvatar.addEventListener("click", handleAvatarClick);
    }

    try {
      if (!id || isNaN(parseInt(id, 10))) {
        throw new Error("Invalid or undefined character ID");
      }

      const characterDataResponse = await GetCharacterdata(id);
      if (!characterDataResponse || !characterDataResponse.data) {
        throw new Error("Failed to fetch character data");
      }

      const decodedData = JSON.parse(atob(characterDataResponse.data));

      const updateElement = (id, property, value) => {
        const element = document.getElementById(id);
        if (element) {
          if (property === "src") {
            element.src = value;
          } else {
            element.innerText = value;
          }
        }
      };

      updateElement("firstMessageContent", "innerText", decodedData.firstMessage);
      updateElement("characterName", "innerText", decodedData.name);
      updateElement("characterDescription", "innerText", decodedData.description);
      updateElement("characterAvatar", "src", decodedData.photo);
      updateElement("overlayCharacterAvatar", "src", decodedData.photo);
      updateElement("overlayCharacterName", "innerText", decodedData.name);
      updateElement("overlayCharacterDescription", "innerText", decodedData.description);
      updateElement("overlayCharacterPersona", "innerText", decodedData.persona || "No persona information available");

      if (loadingOverlay) {
        loadingOverlay.style.opacity = "0";
        loadingOverlay.style.transition = "opacity 0.5s ease-out";
        setTimeout(() => {
          loadingOverlay.style.display = "none";
        }, 500);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      if (loadingOverlay) {
        loadingOverlay.style.display = "none";
      }
    } finally {
      setLoading(false);
      if (characterAvatar) {
        characterAvatar.removeEventListener("click", handleAvatarClick);
      }
    }
  };

  useEffect(() => {
    loadCharacterData();
  }, [id]);

  return (
    <div className="chat-container">
      {loading && (
        <div id="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
