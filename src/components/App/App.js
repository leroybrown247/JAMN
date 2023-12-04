import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../Utils/Spotify"; // Import the Spotify module
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist...");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

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

  const savePlaylist = async () => {
    setIsSaving(true);
    console.log('Saving started'); // Log the start of the saving process
    await Spotify.savePlaylist(playlistName, playlistTracks.map(track => track.uri));
    setIsSaving(false);
    console.log('Saving finished'); // Log the end of the saving process
    setPlaylistName('New Playlist...');
    setPlaylistTracks([]);
  };

  return (
    <div className="App">
      {isSaving ? (
        <div className="loading-screen">Saving...</div>
      ) : (
        <>
          <h1>JAMN!</h1>
          <SearchBar onSearchResults={handleSearchResults} />
          <div className="app-content">
            <div className="searchResults-container">
              <div className="searchResults-content">
                <SearchResults
                  searchResults={searchResults}
                  onAdd={handleAdd}
                  playlistTracks={playlistTracks}
                />
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
                  onSave={savePlaylist}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;