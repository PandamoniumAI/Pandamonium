import React, { useEffect, useState } from "react";
import "../CSS/Tags.css";

export default function Tags() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      }
      return [...prevTags, tag];
    });
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  return (
    <div className="dropdown-container d-inline-block ml-2">
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          id="tagsDropdown"
          aria-expanded={dropdownVisible ? "true" : "false"}
          onClick={toggleDropdown}
        >
          Tags
        </button>
        <div id="selectedTags" className="tags-container d-inline-block ml-2">
          {selectedTags.map((tag) => (
            <span key={tag} className="selected-tag mr-1">
              {tag}
            </span>
          ))}
        </div>
        {dropdownVisible && (
          <ul className="dropdown-menu" aria-labelledby="tagsDropdown" id="tagsList">
            {["Villain", "Hero", "Sci-Fi", "Fantasy", "Male", "Female", "None"].map(
              (tag) => (
                <li key={tag}>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </a>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
