import { Link } from "react-router-dom";

const CharacterCardModal = ({ character }) => {
  return (
    <div className="character-modal">
      <div className="modal-content">
        <img
          src={character.photo}
          alt={character.name}
          className="character-image"
        />
        <h2 className="modal-title">${character.name}</h2>
        <p className="modal-desc">${expandedDesc}</p>
        <Link
          to={{
            pathname: `/chatting.html`,
            search: `id=${character.id}`,
          }}
          className="modal-btn"
        >
          Start Chatting
        </Link>
      </div>
    </div>
  );
};

export default CharacterCardModal;
