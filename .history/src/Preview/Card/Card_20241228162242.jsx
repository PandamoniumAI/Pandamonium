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
        <div className="flex justify-center gap-5">
        {Object.entries(CharacterCards).map(([key, character]) => (
            <div
                key={key}
                className="w-52 h-88 relative rounded-2xl overflow-hidden bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => openPopup(character)}
            >
                <img
                    className="w-full h-4/6 object-cover"
                    src={character.image}
                    alt={character.info.name}
                />
                <div className="p-3 bg-gradient-to-t from-black via-gray-900 to-transparent text-white h-2/6 flex flex-col justify-center">
                    <h2 className="text-lg font-bold">{character.info.name}</h2>
                    <p className="text-sm opacity-90">{character.info.preview}</p>
                    <div className="mt-2 flex justify-between text-xs text-gray-400">
                        <span>{character.meta.creator}</span>
                        <span>{character.meta.chats} chats</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
    
    {showPopup && selectedCharacter && (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fadeIn"
            onClick={closePopup}
        >
            <div
                className="relative bg-gray-900 rounded-xl p-6 w-96 max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center mb-5">
                    <img
                        src={selectedCharacter.image}
                        alt={selectedCharacter.info.name}
                        className="w-28 h-28 rounded-full object-cover shadow-md"
                    />
                </div>
                <div className="text-center text-white mb-5">
                    <h2 className="text-2xl font-bold mb-2">
                        {selectedCharacter.info.name}
                    </h2>
                    <p className="text-sm text-gray-300">{selectedCharacter.info.preview}</p>
                </div>
                <div className="flex justify-between items-center text-gray-400 text-sm mb-5">
                    <span>{selectedCharacter.meta.creator}</span>
                    <span>{selectedCharacter.meta.chats} chats</span>
                </div>
                <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition duration-300">
                    Chat
                </button>
            </div>
        </div>
    )}
    
    );
}
