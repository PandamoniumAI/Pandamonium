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
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-5">
  {Object.entries(CharacterCards).map(([key, character]) => (
    <div
      className="w-full max-w-xs border border-gray-300 rounded-2xl shadow-xl transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:rotate-1 cursor-pointer bg-white"
      key={key}
      onClick={() => openPopup(character)}
    >
      <div className="relative">
        <img
          className="w-full h-64 object-cover rounded-t-2xl"
          src={character.image}
          alt={character.info.name}
        />
      </div>
      <div className="p-6 pt-8" style={{ backgroundColor: '#C62D01' }}>
        <h2 className="text-white text-2xl font-bold mb-2 text-center">{character.info.name}</h2>
        <p className="text-white text-sm opacity-90 mb-4 text-center">{character.info.preview}</p>
        <div className="flex justify-between text-xs text-white opacity-80">
          <span className="font-semibold">{character.meta.creator}</span>
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
