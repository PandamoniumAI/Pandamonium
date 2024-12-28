import React, { useState } from "react";
import Female from "../../assets/Female.jpg";
import Female2 from "../../assets/Female2.jpg";
import Male from "../../assets/Male.jpg";
import "./Card.css";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {Object.entries(CharacterCards).map(([key, character]) => (
                <div
                    className="relative bg-gray-900 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 overflow-hidden"
                    key={key}
                    onClick={() => openPopup(character)}
                >
                    <img
                        className="w-full h-3/4 object-cover"
                        src={character.image}
                        alt={character.info.name}
                    />
                    <div className="p-4 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent">
                        <h2 className="text-lg font-semibold text-white truncate">
                            {character.info.name}
                        </h2>
                        <p className="text-sm text-gray-300 mt-2">
                            {character.info.preview}
                        </p>
                        <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
                            <span>{character.meta.creator}</span>
                            <span>{character.meta.chats} chats</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    
        {showPopup && selectedCharacter && (
            <div
                className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                onClick={closePopup}
            >
                <div
                    className="relative bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-center mb-6">
                        <img
                            src={selectedCharacter.image}
                            alt={selectedCharacter.info.name}
                            className="w-28 h-28 rounded-full object-cover shadow-md"
                        />
                    </div>
                    <div className="text-center text-white">
                        <h2 className="text-2xl font-bold mb-4">
                            {selectedCharacter.info.name}
                        </h2>
                        <p className="text-sm text-gray-300 mb-4">
                            {selectedCharacter.info.preview}
                        </p>
                    </div>
                    <div className="flex justify-between items-center text-gray-400 text-sm mb-6">
                        <span>{selectedCharacter.meta.creator}</span>
                        <span>{selectedCharacter.meta.chats} chats</span>
                    </div>
                    <button className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition duration-300">
                        Chat
                    </button>
                </div>
            </div>
        )}
    </div>
    
    );
}
