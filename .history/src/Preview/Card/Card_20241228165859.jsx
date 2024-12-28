import React, { useState } from "react";
import Female from "../../assets/Female.jpg";
import Female2 from "../../assets/Female2.jpg";
import Male from "../../assets/Male.jpg";

export default function Card() {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const CharacterCards = {
        "1": {
            info: {
                name: "Bella",
                preview: "Bella's story with {{user}} began in the vibrant setting of their shared sales department.",
            },
            meta: {
                creator: "@d4rth",
                chats: "5.8m",
            },
            image: Female,
        },
        "2": {
            info: {
                name: "Ethan",
                preview: "Ethan James Hartley, a 24-year-old recent graduate.",
            },
            meta: {
                creator: "@Arkadien",
                chats: "12.7m",
            },
            image: Male,
        },
        "3": {
            info: {
                name: "Ellie",
                preview: "Ellie Forster, a 21 year old office worker, has a deep crush on {{user}}.",
            },
            meta: {
                creator: "@Whitzscott",
                chats: "12.8m",
            },
            image: Female2,
        },
    };

    const openPopup = (character) => {
        setSelectedCharacter(character);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedCharacter(null);
    };

    return (
        <div>
<div className="flex flex-wrap gap-6 justify-evenly">
  {Object.entries(CharacterCards).map(([key, character]) => (
    <div
      className="w-64 border border-gray-300 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
      key={key}
      onClick={() => openPopup(character)}
    >
      <img
        className="w-full h-48 object-contain"
        src={character.image}
        alt={character.info.name}
      />
      <div className="p-4 bg-[#C62D01]">
        <h2 className="text-xl font-semibold text-white mb-2">{character.info.name}</h2>
        <p className="text-sm text-white opacity-80 mb-3">{character.info.preview}</p>
        <div className="flex justify-between text-xs text-white opacity-70">
          <span>{character.meta.creator}</span>
          <span>{character.meta.chats} chats</span>
        </div>
      </div>
    </div>
  ))}
</div>




            {showPopup && selectedCharacter && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div
                        className="popup-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="popup-content">
                            <div className="popup-character-image">
                                <img
                                    src={selectedCharacter.image}
                                    alt={selectedCharacter.info.name}
                                    className="popup-image"
                                />
                            </div>
                            <div className="popup-text">
                                <h2>{selectedCharacter.info.name}</h2>
                                <p>{selectedCharacter.info.preview}</p>
                            </div>
                            <div className="popup-meta">
                                <span>{selectedCharacter.meta.creator}</span>
                                <span>{selectedCharacter.meta.chats} chats</span>
                            </div>
                            <button className="popup-btn">Chat</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
