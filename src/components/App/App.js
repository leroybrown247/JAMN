import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../Utils/Spotify"; // Import the Spotify module
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState(localStorage.getItem('playlistName') || 'Add Playlist Name');
  const [playlistTracks, setPlaylistTracks] = useState(JSON.parse(localStorage.getItem('playlistTracks')) || []);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // New state variable
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  

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

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  const handleSearchResults = (searchResults, term) => {
    setSearchResults(searchResults);
    setSearchTerm(term);
    setHasSearched(true); // Set hasSearched to true when a search is made
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

  useEffect(() => {
    localStorage.setItem('playlistName', playlistName);
    localStorage.setItem('playlistTracks', JSON.stringify(playlistTracks));
  }, [playlistName, playlistTracks]);

  return (
    <div className="App">
      {isSaving ? (
        <div className="loading-screen">Saving...</div>
      ) : (
        <>
          <h1>JAMN!</h1>
          <SearchBar onSearchResults={handleSearchResults} initialTerm={searchTerm} />
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
                  hasSearched={hasSearched} // Pass hasSearched as a prop

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