import React, { useRef, useState } from "react";
import "./CharacterCard.css";
import PlaceholderImage from "../../assets/error.jpg";

const CharacterCard = ({ character, onClick }) => {
  const cardRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(character.photo);
  const [isError, setIsError] = useState(false);
  const placeholderImage = PlaceholderImage;

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
      setIsError(true);
    }
  };

  return (
    <div
      onClick={isError ? null : onClick}
      ref={cardRef}
      className={`character-card ${isError ? "error" : ""}`}
      onMouseMove={!isError ? handleMouseMove : null}
    >
      <div className="image-container">
        <img
          className="character-image"
          src={imageSrc}
          alt={isError ? "Error" : character.name}
          onError={handleImageError}
        />
      </div>
      <h3 className="character-name">{isError ? "ERROR" : character.name}</h3>
      <p className="character-description">
        {isError ? "ERROR" : character.description.substring(0, 100) + "..."}
      </p>
      <span className="badge bg-primary character-tags">
        {isError ? "ERROR" : character.tag}
      </span>
    </div>
  );
};

export default CharacterCard;
