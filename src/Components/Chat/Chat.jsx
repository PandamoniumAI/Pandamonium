import "../CSS/chat.css";
import { GetCharacterdata } from "../../Utils/dataSource";
import React, { useEffect, useState } from "react";
import Checker from "./Checker/Checker";
import { showPreview, hidePreview } from "./Preview/Preview.jsx";
import Loading from "./Loading/Loading";
import HandleMessage from "./handleMessage/handleMessage";

export default function Chat({ id }) {
  const [characterData, setCharacterData] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchCharacter = async () => {
    try {
      const data = await GetCharacterdata(id);
      setCharacterData(data);
    } catch (error) {
      console.error("Error fetching character data:", error);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  return (
    <>
      <div
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => (window.location.href = "index.html")}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "24px",
              padding: "0 15px 0 0",
              cursor: "pointer",
              transition: "background 0.3s",
              borderRadius: "50%",
            }}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() =>
              (document.getElementById("characterOverlay").style.display =
                "block")
            }
          >
            <img
              src=""
              alt="Bot Avatar"
              id="characterAvatar"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                marginRight: "15px",
              }}
            />
            <div>
              <h3
                id="characterName"
                style={{ margin: 0, color: "#4a90e2", fontSize: "1.5rem" }}
              >
                {characterData ? characterData.name : "NULL"}
              </h3>
              <p
                id="characterDescription"
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: "30ch",
                  color: "#e0e0e0",
                  marginTop: "5px",
                }}
              >
                {characterData ? characterData.description : "NULL"}
              </p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => (window.location.href = "settings.html")}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              transition: "background 0.3s, transform 0.3s",
              borderRadius: "50%",
            }}
          >
            <i className="fas fa-cog"></i>
          </button>
          <button
            onClick={() => (window.location.href = "guideline.html")}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              transition: "background 0.3s, transform 0.3s",
              borderRadius: "50%",
            }}
          >
            <i className="fas fa-question-circle"></i>
          </button>
        </div>
      </div>

      <div
        id="characterOverlay"
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.9)",
          zIndex: 1000,
          backdropFilter: "blur(5px)",
          scrollbarWidth: "1px",
        }}
        onClick={() =>
          (document.getElementById("characterOverlay").style.display = "none")
        }
      >
        <div
          style={{
            position: "relative",
            maxWidth: "600px",
            margin: "50px auto",
            background: "#2c2c2c",
            padding: "30px",
            borderRadius: "15px",
            color: "white",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            onClick={() =>
              (document.getElementById("characterOverlay").style.display =
                "none")
            }
            style={{
              position: "absolute",
              right: "15px",
              top: "15px",
              background: "none",
              border: "none",
              color: "#ff4d4d",
              fontSize: "24px",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
          >
            ×
          </button>
          <img
            id="overlayCharacterAvatar"
            src=""
            alt="Character"
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
              margin: "0 auto 20px",
              display: "block",
              border: "3px solid #4a90e2",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          />
          <h2
            id="overlayCharacterName"
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "1.8rem",
              fontWeight: "bold",
            }}
          ></h2>
          <div
            id="overlayCharacterDescription"
            style={{
              marginBottom: "20px",
              lineHeight: "1.6",
              fontSize: "1rem",
            }}
          ></div>
          <div
            id="overlayCharacterPersona"
            style={{
              marginBottom: "20px",
              lineHeight: "1.6",
              fontSize: "1rem",
            }}
          ></div>
        </div>
      </div>

      <div
        className="chat-box"
        id="chatBox"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
        }}
      >
        <div className="message bot">
          <div className="message-content" id="firstMessageContent"></div>
        </div>
        <div
          id="previewMessage"
          style={{
            display: "none",
            margin: "10px",
            padding: "15px",
            backgroundColor: "rgba(74, 144, 226, 0.1)",
            borderRadius: "10px",
            color: "#888",
            fontStyle: "italic",
          }}
        ></div>
        <div id="chatHistory"></div>
      </div>

      <div className="input-area">
        <input
          type="text"
          id="messageInput"
          placeholder="Type your message..."
          onInput={(e) => showPreview(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              hidePreview();
            }
          }}
        />
        <button id="sendBtn" onClick={hidePreview}>
          <i className="fas fa-paper-plane">Send</i>
        </button>
      </div>
    </>
  );
};
