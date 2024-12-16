import { useEffect, useState } from "react";
import { FetchCharacters } from "../../Utils/Utils";
import SearchBar from "../SearchBar/SearchBar";
import "../../Types/typedef";
import CharacterCard from "../CharacterCard/CharacterCard";
import "./HomePage.css";

const HomePage = () => {
  const [characters, setCharacters] = useState(
    /** @type {CharacterData[]} */ [],
  );

  const [filteredCharacters, setFilteredCharacters] = useState([]);

  let refresh = false;
  const fetchCharacters = async () => {
    const data = await FetchCharacters();
    setCharacters(data);
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
              return <CharacterCard key={index} character={character} />;
            })
          : characters.map((character, index) => {
              return <CharacterCard key={index} character={character} />;
            })}
      </div>
    </div>
  );
};

export default HomePage;
