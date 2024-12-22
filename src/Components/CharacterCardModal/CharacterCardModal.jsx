import { Link, useNavigate } from "react-router-dom";
import "./CharacterCardModal.css";
import { useState } from "react";

const CharacterCardModal = ({ character, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const expandedDesc = character.description;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="character-modal" onClick={(e) => e.stopPropagation()}>
        <img
          className="character-image"
          src={character.photo}
          alt={character.name}
        />
        <div className="modal-content">
          <h2 className="modal-title">{character.name}</h2>
          <p className="modal-desc">{expandedDesc}</p>
          <Link
            className="modal-btn"
            to={{
              pathname: `/chat/${character.id}`,
            }}
            style={{ textDecoration: "none" }}
          >
            Start Chatting
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterCardModal;
