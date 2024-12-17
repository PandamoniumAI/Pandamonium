import { Link } from "react-router-dom";
import "../CSS/CharacterCardModal.css";

const CharacterCardModal = ({ character, onClose }) => {
  const expandedDesc = character.description;
  return (
    <div onClick={onClose} className="modal-overlay">
      <div className="character-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <img
            src={character.photo}
            alt={character.name}
            className="character-image"
          />
          <h2 className="modal-title">{character.name}</h2>
          <p className="modal-desc">{expandedDesc}</p>
          <Link
            to={{
              pathname: `/chat/${character.id}`,
            }}
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
