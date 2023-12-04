import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist...");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const handleNameChange = (newName) => {
    setPlaylistName(newName);
  };

  const handleAdd = (trackId) => {
    const trackToAdd = searchResults.find((track) => track.id === trackId);
    if (trackToAdd && !playlistTracks.includes(trackToAdd)) {
      setPlaylistTracks([...playlistTracks, trackToAdd]);
    }
  };

  const handleRemove = (trackIdToRemove) => {
    const updatedPlaylist = playlistTracks.filter(
      (track) => track.id !== trackIdToRemove
    );
    setPlaylistTracks(updatedPlaylist);
  };

  const handleResetPlaylist = () => {
    setPlaylistTracks([]);
  };

  const handleSearchResults = (searchResults) => {
    setSearchResults(searchResults);
  };

  return (
    <div className="App">
      <h1>JAMN!</h1>
      <SearchBar onSearchResults={handleSearchResults} />
      <div className="app-content">
        <div className="searchResults-container">
          <div className="searchResults-content">
            <SearchResults searchResults={searchResults} onAdd={handleAdd} />
          </div>
        </div>

        <div className="playlist-container">
          <div className="playlist-content">
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onNameChange={handleNameChange}
              onRemove={handleRemove}
              onReset={handleResetPlaylist}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
