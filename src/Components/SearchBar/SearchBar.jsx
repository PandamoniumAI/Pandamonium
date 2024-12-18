const SearchBar = ({ performSearch, onKeyPress }) => {
  const handleChange = (e) => {
    performSearch(e.target.value);
  };

  return (
    <input
      type="text"
      className="search-input form-control me-2"
      placeholder="Search characters..."
      aria-label="Search characters"
      onChange={handleChange}
      onKeyPress={onKeyPress}
      style={{
        width: "50%",
        position: "relative",
        left: "350px"
      }}
    />
  );
};

export default SearchBar;
