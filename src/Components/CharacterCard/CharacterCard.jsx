import React, { useRef, useState } from "react";
import "../CSS/CharacterCard.css";

const CharacterCard = ({ character, onClick }) => {
  const cardRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(character.photo);
  const placeholderImage = "./error.jpg";

  const shortDesc = character.description.substring(0, 100) + "...";

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  const handleImageError = () => {
    if (imageSrc !== placeholderImage) {
      setImageSrc(placeholderImage);
    }
  };

  return (
    <div
      onClick={onClick}
      ref={cardRef}
      className="character-card"
      onMouseMove={handleMouseMove}
    >
      <div className="image-container">
        <img
          className="character-image"
          src={imageSrc}
          alt={character.name}
          onError={handleImageError}
        />
      </div>
      <h3 className="character-name">{character.name}</h3>
      <p className="character-description">{shortDesc}</p>
      <span className="badge bg-primary character-tags">{character.tag}</span>
    </div>
  );
};

export default CharacterCard;
