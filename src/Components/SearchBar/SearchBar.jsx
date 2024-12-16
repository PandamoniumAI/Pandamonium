const SearchBar = ({ performSearch }) => {
  return <input type="text" onChange={(e) => performSearch(e.target.value)} />;
};

export default SearchBar;
