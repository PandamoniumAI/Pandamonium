import React, { useState, useEffect } from "react";
import "./Tags.css";

export default function Tags() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  return (
    <div
      className="dropdown-container"
      id="tagsDropdown"
      style={{ position: "absolute", left: "calc(70% + 70px)" }}
    >
      <button
        className="btn dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
      >
        Tags
      </button>

      {dropdownVisible && (
        <ul
          className="dropdown-menu"
          id="dropdown-menu"
          aria-labelledby="tagsDropdown"
          style={{ width: "200px" }}
        >
          {[
            "Villain",
            "Hero",
            "Sci-Fi",
            "Fantasy",
            "Male",
            "Female",
            "None",
          ].map((tag) => (
            <li key={tag}>
              <a className="dropdown-item" href="#">
                {tag}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
