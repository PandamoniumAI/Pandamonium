const SearchBar = ({ performSearch }) => {
  return (
    <input
      type="text"
      className="search-input form-control me-2"
      placeholder="Search characters..."
      aria-label="Search characters"
      onChange={(e) => performSearch(e.target.value)}
    />
  );
};

export default SearchBar;
