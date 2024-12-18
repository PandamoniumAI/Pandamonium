import React, { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { FetchCharacters } from "../../Utils/Utils";
import SearchBar from "../SearchBar/SearchBar";
import CharacterCard from "../CharacterCard/CharacterCard";
import CharacterCardModal from "../CharacterCardModal/CharacterCardModal";
import "../CSS/HomePage.css";
import Footer from "../../assets/footer.png";
import Tags from "../Tags/Tags.jsx";
import SideBar from "../SideBar/SideBARRR.jsx";
import MobileSideBar from "../SideBar/MobileSideBar.jsx";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 15;

  const isMobile = useMediaQuery({ maxWidth: 768 });

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

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      const data = await FetchCharacters();
      setCharacters(data);
      setIsLoading(false);
    };

    fetchCharacters();
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  const handleSearch = (query) => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(query.toLowerCase()) ||
      character.description.toLowerCase().includes(query.toLowerCase()) ||
      character.tag.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCharacters(filtered);
    setCurrentPage(0);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const query = event.target.value;
      handleSearch(query);
    }
  };

  const paginatedCharacters = (filteredCharacters.length > 0 ? filteredCharacters : characters).slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const hasMorePages =
    (currentPage + 1) * itemsPerPage <
    (filteredCharacters.length > 0 ? filteredCharacters.length : characters.length);

  const handleNextPage = () => {
    if (hasMorePages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="homepage-container">
      <div className="search-bar-container">
        <SearchBar id="search-input" onKeyPress={handleKeyPress} />
        <Tags />
      </div>
      <div className="container text-center mt-5">
        <div id="characters" className="character-grid">
          {isLoading
            ? Array.from({ length: itemsPerPage }, (_, i) => <SkeletonCard key={i} />)
            : paginatedCharacters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onClick={() => {
                    setSelectedCharacter(character);
                    setShowModal(true);
                  }}
                />
              ))}
        </div>
        {!isLoading && hasMorePages && (
          <button className="btn btn-primary mt-3" onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>

      {!isMobile && <SideBar />}

      {showModal && selectedCharacter && (
        <CharacterCardModal character={selectedCharacter} onClose={closeModal} />
      )}

      {isMobile && <div className="mobile-sidebar-container"><MobileSideBar /></div>}
    </div>
  );
};

export default HomePage;
