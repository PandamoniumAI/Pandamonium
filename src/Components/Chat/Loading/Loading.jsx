import React, { useEffect, useState } from "react";

export default function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const characterAvatar = document.getElementById("characterAvatar");
    const loadingOverlay = document.getElementById("loading-overlay");

    const handleAvatarClick = () => {
      document.getElementById("characterOverlay").style.display = "block";
    };

    if (characterAvatar) {
      characterAvatar.addEventListener("click", handleAvatarClick);
    }

    let characterData;
    Promise.all([
      fetch("https://server-hhcx.onrender.com/api/id/get")
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) =>
          fetch(
            "https://server-hhcx.onrender.com/characterdata/id?id=" +
              data.characterId
          ).then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          })
        ),
    ])
      .then(([characterResponse]) => {
        const decodedData = JSON.parse(atob(characterResponse.data));
        characterData = decodedData;

        document.getElementById("firstMessageContent").innerText =
          decodedData.firstMessage;
        document.getElementById("characterName").innerText = decodedData.name;
        document.getElementById("characterDescription").innerText =
          decodedData.description;
        document.getElementById("characterAvatar").src = decodedData.photo;

        document.getElementById("overlayCharacterAvatar").src = decodedData.photo;
        document.getElementById("overlayCharacterName").innerText =
          decodedData.name;
        document.getElementById("overlayCharacterDescription").innerText =
          decodedData.description;
        document.getElementById("overlayCharacterPersona").innerText =
          decodedData.persona || "No persona information available";

        loadingOverlay.style.opacity = "0";
        loadingOverlay.style.transition = "opacity 0.5s ease-out";
        setTimeout(() => {
          loadingOverlay.style.display = "none";
        }, 500);
      })
      .catch((error) => {
        console.error("Error:", error);
        loadingOverlay.style.display = "none";
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      if (characterAvatar) {
        characterAvatar.removeEventListener("click", handleAvatarClick);
      }
    };
  }, []);

  return (
    <>
      <div className="chat-container">
        {loading && (
          <div id="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </>
  );
}
