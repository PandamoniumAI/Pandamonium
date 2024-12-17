import { useEffect, useState } from "react";
import { FetchCharacters } from "../../Utils/Utils";
import SearchBar from "../SearchBar/SearchBar";
import CharacterCard from "../CharacterCard/CharacterCard";
import CharacterCardModal from "../CharacterCardModal/CharacterCardModal";
import "./HomePage.css";
import Footer from "../../assets/footer.png";
import Tags from "../Tags/Tags.jsx";
import SideBar from "../SideBar/SideBar.jsx";

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
  const Characters = ({ filteredCharacters, characters, setSelectedCharacter, setShowModal }) => {
    const displayCharacters = filteredCharacters.length > 0 ? filteredCharacters : characters;
    return displayCharacters.length > 0 ? (
      displayCharacters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={() => {
            setSelectedCharacter(character);
            setShowModal(true);
          }}
        />
      ))
    ) : (
      <div className="col-12 text-center mt-4">No characters found</div>
    );
  };
  
  const handleSearch = (query) => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(query.toLowerCase()) ||
      character.description.toLowerCase().includes(query.toLowerCase()) ||
      character.tag.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const query = event.target.value;
      handleSearch(query);
    }
  };
  
  return (
    <>
      <SearchBar
        id="search-input"
        onKeyPress={handleKeyPress}
      />
      <Tags />
      <div className="container text-center mt-5">
        <div id="characters" className="row">
          <Characters 
            filteredCharacters={filteredCharacters} 
            characters={characters}
            setSelectedCharacter={setSelectedCharacter}
            setShowModal={setShowModal}
          />
        </div>
      </div>
  
      <SideBar />
  
      {showModal && selectedCharacter && (
        <CharacterCardModal
          character={selectedCharacter}
          onClose={closeModal}
        />
      )}
    </>
  );
  
};
export default HomePage;
