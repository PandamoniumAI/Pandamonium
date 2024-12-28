import React, { useState } from "react";
import Female from "../../assets/Female.jpg";
import Female2 from "../../assets/Female2.jpg";
import Male from "../../assets/Male.jpg";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                {Object.entries(CharacterCards).map(([key, character]) => (
                    <div
                        className="w-[194px] h-[323px] border-[0.5px] border-gray-300 rounded-[15px] shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:translate-y-[-10px] cursor-pointer bg-transparent overflow-hidden group border-["
                        key={key}
                        onClick={() => openPopup(character)}
                    >
                        <div className="relative w-full h-full">
                            <img
                                className="w-full h-full object-cover rounded-t-[15px] group-hover:opacity-80 transition-opacity duration-500"
                                src={character.image}
                                alt={character.info.name}
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-b-[15px] opacity-85">
                            <h2 className="text-white text-sm font-semibold mb-1 text-left drop-shadow-lg">{character.info.name}</h2>
                            <p className="text-white text-xs opacity-90 mb-2 text-left drop-shadow-md">{character.info.preview}</p>
                            <div className="flex justify-between items-center text-xs text-white opacity-80 mt-2">
                                <span className="font-semibold">{character.meta.creator}</span>
                                <div className="flex items-center space-x-1">
                                    <ChatIcon className="w-4 h-4 text-white" />
                                    <span>{character.meta.chats}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
