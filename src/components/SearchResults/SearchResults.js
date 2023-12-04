import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./SearchResults.css";

function SearchResults({ searchResults, onAdd }) {

  return (
    <div className="SearchResultsContainer">
      <div className="SearchResults">
        <h2>Search Results</h2>
        <hr />
        <Tracklist tracks={searchResults} onAdd={onAdd} isRemoval={false} />
      </div>
    </div>
  );
}

export default SearchResults;
