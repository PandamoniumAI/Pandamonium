import React, { useEffect, useState } from "react";
import "../CSS/Tags.css";

export default function Tags() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 300,
    left: 0,
    width: 0,
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      }
      return [...prevTags, tag];
    });
  };

  const updateTagsDropdownPosition = () => {
    const searchInput = document.getElementById("#search-input");
    const tagsDropdownContainer = document.getElementById("tagsDropdownContainer");

    if (searchInput && tagsDropdownContainer) {
      const searchInputRect = searchInput.getBoundingClientRect();
      setDropdownPosition({
        top: window.innerWidth <= 768 ? searchInputRect.bottom + 10 : 300,
        left: searchInputRect.left,
        width: searchInputRect.width,
      });
    }
  };

  useEffect(() => {
    updateTagsDropdownPosition();
    window.addEventListener("resize", updateTagsDropdownPosition);
    window.addEventListener("orientationchange", updateTagsDropdownPosition);

    return () => {
      window.removeEventListener("resize", updateTagsDropdownPosition);
      window.removeEventListener("orientationchange", updateTagsDropdownPosition);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="dropdown-container">
        <div
          className="dropdown mb-3"
          id="tagsDropdownContainer"
          style={{
            position: "absolute",
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
          }}
        >
          <div className="d-flex align-items-center">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="tagsDropdown"
              aria-expanded={dropdownVisible ? "true" : "false"}
              onClick={toggleDropdown}
            >
              Tags
            </button>
            <div id="selectedTags" className="tags-container">
              {selectedTags.map((tag) => (
                <span key={tag} className="selected-tag">
                  {tag}
                </span>
              ))}
            </div>
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
    </>
  );
}
