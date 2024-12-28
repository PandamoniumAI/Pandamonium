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
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-8">
  {Object.entries(CharacterCards).map(([key, character]) => (
    <div
      className="w-full max-w-xs border-2 border-gray-200 rounded-3xl shadow-2xl transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:rotate-2 cursor-pointer bg-white overflow-hidden group"
      key={key}
      onClick={() => openPopup(character)}
    >
      <div className="relative w-full h-64">
        <img
          className="w-full h-full object-cover rounded-t-3xl group-hover:opacity-80 transition-opacity duration-500"
          src={character.image}
          alt={character.info.name}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
      </div>
      <div className="p-6 bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-b-3xl">
        <h2 className="text-white text-3xl font-extrabold mb-3 text-center drop-shadow-lg">{character.info.name}</h2>
        <p className="text-white text-lg opacity-90 mb-5 text-center drop-shadow-md">{character.info.preview}</p>
        <div className="flex justify-between text-sm text-white opacity-80">
          <span className="font-semibold">{character.meta.creator}</span>
          <span>{character.meta.chats} chats</span>
        </div>
      </div>
    </div>
  ))}
</div>

 </div>
    );
}
