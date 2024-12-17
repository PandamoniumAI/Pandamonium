import { useEffect, useState } from "react";
import { FetchCharacters } from "../../Utils/Utils";
import SearchBar from "../SearchBar/SearchBar";
import CharacterCard from "../CharacterCard/CharacterCard";
import CharacterCardModal from "../CharacterCardModal/CharacterCardModal";
import "./HomePage.css";
import Footer from "../../assets/footer.png";
import Tags from "../Tags/Tags.jsx";
import SideBar from "../SideBar/SideBARRR.jsx";

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
    <>
      <div
        id="loadingPopup"
        className="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 d-flex justify-content-center align-items-center"
        style={{ zIndex: 9999, animation: "fadeIn 0.5s" }}
      >
        <div
          className="text-center text-white"
          style={{ animation: "slideIn 0.5s" }}
        >
          <div className="w-100 bg-secondary rounded-3">
            <div
              id="loadingBar"
              className="w-0 h-3 bg-primary rounded-3"
              style={{ animation: "loading 2s infinite" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="text-center mt-3">
        <a
          href="http://agaga.com"
          className="d-inline-block rounded overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
          style={{
            fontWeight: "bold",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
        >
          <img
            src={Footer}
            alt="Footer Image"
            className="rounded-3 shadow-lg"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "300px",
              maxHeight: "200px",
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </a>
      </div>

      <h1
        className="position-fixed top-0 start-0 fs-3 text-white"
        style={{
          userSelect: "none",
          fontWeight: "bold",
          letterSpacing: "1px",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
          padding: "20px",
          margin: "0",
          zIndex: 10000,
        }}
      >
        Pandamonium
      </h1>

      <div>
        <div>
          <div
            className="search-section d-flex justify-content-center align-items-center mb-4"
            style={{ fontSize: "1.2rem" }}
          >
            <SearchBar />
            <button
              className="search-button btn btn-primary"
              style={{ padding: "8px 16px", fontSize: "1rem" }}
              onClick={() => {
                const query = document.querySelector(".search-input").value;
                if (query.length > 0) {
                  const filtered = characters.filter((character) =>
                    character.name.toLowerCase().includes(query.toLowerCase()),
                  );
                  setFilteredCharacters(filtered);
                } else {
                  setFilteredCharacters([]);
                }
              }}
            >
              Search
            </button>
          </div>

          <div className="characters">
            {(filteredCharacters.length > 0
              ? filteredCharacters
              : characters
            ).map((character, index) => {
              return <CharacterCard key={index} character={character} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
