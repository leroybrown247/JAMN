import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const handleNameChange = (newName) => {
    setPlaylistName(newName);
  };

  const handleRemove = (updatedPlaylist) => {
    setPlaylistTracks(updatedPlaylist);
  }

  const handleResetPlaylist = () => {
    setPlaylistTracks([]);
  };

  const handleSearchResults = (searchResults) => {
    console.log('Search results received:', searchResults);
    setSearchResults(searchResults);
  }

  return (
    <div className="App">
      <h1>JAMN!</h1>
      <SearchBar onSearchResults={handleSearchResults} />
      <div className="app-content">
        <div className="searchResults-container">
          <div className="searchResults-content">
            <SearchResults searchResults={searchResults} />
          </div>
        </div>

        <div className="playlist-container">
          <div className="playlist-content">
            <h2>PLAYLIST</h2>
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