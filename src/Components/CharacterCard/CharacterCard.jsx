import React, { useRef } from "react";
import "./CharacterCard.css";

const CharacterCard = ({ character, onClick }) => {
  const cardRef = useRef(null);
  const shortDesc = character.description.substring(0, 100) + "...";

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      onClick={() => {
        onClick();
        console.log("clicked");
      }}
      ref={cardRef}
      className="character-card"
      onMouseMove={handleMouseMove}
    >
      <div className="image-container">
        <img
          className="character-image"
          src={character.photo}
          alt={character.name}
        />
      </div>
      <h3 className="character-name">{character.name}</h3>
      <p className="character-description">{shortDesc}</p>
      <span className="badge bg-primary character-tags">{character.tag}</span>
    </div>
  );
};

export default CharacterCard;
