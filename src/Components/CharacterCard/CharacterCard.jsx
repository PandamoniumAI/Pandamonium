import "./CharacterCard.css";
import React, { useState } from "react";
import CharacterCardModal from "../CharacterCardModal/CharacterCardModal";

const CharacterCard = ({ character }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left, // X position relative to card
      y: e.clientY - rect.top, // Y position relative to card
    });
  };

  const truncatedDesc =
    character.description.length > 100
      ? character.description.substring(0, 100) + "..."
      : character.description;

  return (
    <div
      className="character-card animate__animated animate__fadeInUp"
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mousePosition.x}px`,
        "--mouse-y": `${mousePosition.y}px`,
      }}
    >
      <div className="image-container">
        <img
          className="character-image"
          src={character.photo}
          alt={character.name}
        />
      </div>
      <div className="chat-count">
        <i className="fas fa-comment"></i>
        <span className="count">{character.chats}</span>
      </div>
      <h3 className="character-name">{character.name}</h3>
      <p className="character-description">{truncatedDesc}</p>
      <span className="badge bg-primary character-tags">{character.tag}</span>
      <div onClick={() => setShowModal(!showModal)}>
        {showModal && <CharacterCardModal character={character} />}
      </div>
    </div>
  );
};

export default CharacterCard;
