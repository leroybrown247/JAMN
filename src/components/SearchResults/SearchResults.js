import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./SearchResults.css";

function SearchResults({ searchResults }) {
  console.log('Search results:', searchResults);

  return (
    <div className="SearchResultsContainer">
      <div className="SearchResults">
        <h2>Search Results</h2>
        <Tracklist tracks={searchResults} />
      </div>
    </div>
  );
}

export default SearchResults;