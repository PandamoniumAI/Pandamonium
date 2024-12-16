import { useEffect, useState } from "react";
import { FetchCharacters } from "../../Utils/Utils";
import SearchBar from "../SearchBar/SearchBar";
import CharacterCard from "../CharacterCard/CharacterCard";
import CharacterCardModal from "../CharacterCardModal/CharacterCardModal";
import "./HomePage.css";

const HomePage = () => {
  const [characters, setCharacters] = useState([]);

  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  let refresh = false;
  const fetchCharacters = async () => {
    const data = await FetchCharacters();
    setCharacters(data);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  useEffect(() => {
    fetchCharacters();
  }, [refresh]);

  return (
    <div>
      <SearchBar
        performSearch={(query) => {
          if (query.length > 0) {
            const filtered = characters.filter((character) => {
              return character.name.toLowerCase().includes(query.toLowerCase());
            });
            setFilteredCharacters(filtered);
          } else {
            setFilteredCharacters([]);
          }
        }}
      />
      <div className="characters">
        {filteredCharacters.length > 0
          ? filteredCharacters.map((character, index) => {
              return (
                <CharacterCard
                  onClick={() => {
                    setSelectedCharacter(character);
                    setShowModal(!showModal);
                  }}
                  key={index}
                  character={character}
                />
              );
            })
          : characters.map((character, index) => {
              return (
                <CharacterCard
                  onClick={() => {
                    setSelectedCharacter(character);
                    setShowModal(!showModal);
                  }}
                  key={index}
                  character={character}
                />
              );
            })}
      </div>
      {showModal && selectedCharacter && (
        <CharacterCardModal
          onClose={closeModal}
          character={selectedCharacter}
        />
      )}
    </div>
  );
};

export default HomePage;
