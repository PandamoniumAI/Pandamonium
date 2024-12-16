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
    <>
      <div
        id="loadingPopup"
        style={{
          display: "none",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          zIndex: "9999",
          justifyContent: "center",
          alignItems: "center",
          animation: "fadeIn 0.5s",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "white",
            animation: "slideIn 0.5s",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              fontSize: "1.5em",
              fontWeight: "bold",
            }}
          >
            Loading...
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "#555",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              id="loadingBar"
              style={{
                width: "0%",
                height: "20px",
                backgroundColor: "#007bff",
                borderRadius: "5px",
                animation: "loading 2s infinite",
              }}
            ></div>
          </div>
        </div>
      </div>

      <h1
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: "1.5rem",
          color: "#ffffff",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
      >
        Pandamonium
      </h1>
      <div>
        <SearchBar />
        <div>
          <div
            className="search-section d-flex justify-content-center align-items-center mb-4"
            style={{ fontSize: "1.2rem" }}
          >
            <input
              type="text"
              className="search-input form-control me-2"
              placeholder="Search characters..."
              aria-label="Search characters"
              style={{ padding: "8px", width: "80%" }}
              onChange={(e) => {
                const query = e.target.value;
                if (query.length > 0) {
                  const filtered = characters.filter((character) =>
                    character.name.toLowerCase().includes(query.toLowerCase()),
                  );
                  setFilteredCharacters(filtered);
                } else {
                  setFilteredCharacters([]);
                }
              }}
            />
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
