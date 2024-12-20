import { Link, useNavigate } from "react-router-dom";
import "../CSS/CharacterCardModal.css";
import { useState } from "react";

const CharacterCardModal = ({ character, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const expandedDesc = character.description;

  const handleStartChatting = async () => {
    setIsLoading(true);
    try {
      navigate(`/chat/${encodeURIComponent(character.id)}`, { state: { character } });
    } catch (error) {
      console.error("Error navigating to chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="character-modal" onClick={(e) => e.stopPropagation()}>
        <img className="character-image" src={character.photo} alt={character.name} />
        <div className="modal-content">
          <h2 className="modal-title">{character.name}</h2>
          <p className="modal-desc">{expandedDesc}</p>
          <button
            onClick={handleStartChatting}
            className="modal-btn"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Start Chatting"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCardModal;
