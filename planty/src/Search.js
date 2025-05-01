import React from "react";

function Search({ search, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search plants..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default Search;
