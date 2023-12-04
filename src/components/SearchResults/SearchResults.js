import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./SearchResults.css";

function SearchResults({ searchResults, onAdd, playlistTracks }) {
  // Filter out the tracks that are already in the playlist
  const filteredSearchResults = searchResults.filter(
    (searchResult) => !playlistTracks.some((playlistTrack) => playlistTrack.id === searchResult.id)
  );

  return (
    <div className="SearchResultsContainer">
      <div className="SearchResults">
        <h2>Search Results</h2>
        <hr />
        <Tracklist tracks={filteredSearchResults} onAdd={onAdd} isRemoval={false} />
      </div>
    </div>
  );
}

export default SearchResults;