import { Link } from "react-router-dom";
import "../CSS/CharacterCardModal.css";
import { GetCharacterId } from "../../Utils/dataSource";
import { useState, useEffect } from "react";

const CharacterCardModal = ({ character, onClose }) => {
  const [characterId, setCharacterId] = useState(null);
  const expandedDesc = character.description;

  useEffect(() => {
    const fetchCharacterId = async () => {
      try {
        const id = await GetCharacterId();
        setCharacterId(id);
      } catch (error) {
        console.error("Error fetching character ID:", error);
      }
    };
    fetchCharacterId();
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="character-modal" onClick={(e) => e.stopPropagation()}>
        <img className="character-image" src={character.photo} alt={character.name} />
        <div className="modal-content">
          <h2 className="modal-title">{character.name}</h2>
          <p className="modal-desc">{expandedDesc}</p>
          <Link
            to={`/chat/${encodeURIComponent(character.id)}`}
            state={{ character }}
            className="modal-btn"
          >
            Start Chatting
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterCardModal;
