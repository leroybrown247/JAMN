import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../Utils/Spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Playlists from "../Playlist/Playlists/Playlists";
import "./App.css";
import logo from "../icons/Leroy_Favicon.svg";

const spotifyApi = new SpotifyWebApi();

function App() {

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      const scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState(
    localStorage.getItem("playlistName") || "Add Playlist Name"
  );
  const [playlistTracks, setPlaylistTracks] = useState(
    JSON.parse(localStorage.getItem("playlistTracks")) || []
  );
  const [isSaving, setIsSaving] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );
  const [playlists, setPlaylists] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);

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
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  const handleSearchResults = (searchResults, term) => {
    setSearchResults(searchResults);
    setSearchTerm(term);
    setHasSearched(true);
  };

  const savePlaylist = async () => {
    setIsSaving(true);
    console.log("Saving started");

    try {
      const playlistId = await Spotify.savePlaylist(
        playlistName,
        playlistTracks.map((track) => track.uri)
      );

      setPlaylists((prevPlaylists) => [
        ...prevPlaylists,
        { name: playlistName, id: playlistId },
      ]);

      setIsSaving(false);
      console.log("Saving finished");

      setPlaylistName("New Playlist...");
      setPlaylistTracks([]);
    } catch (error) {
      setIsSaving(false);
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("playlistName", playlistName);
    localStorage.setItem("playlistTracks", JSON.stringify(playlistTracks));
  }, [playlistName, playlistTracks]);

  useEffect(() => {
    spotifyApi.getUserPlaylists().then(
      (data) => {
        console.log(data.items);
        setPlaylists(data.items);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  console.log(playlists);

  const handlePlay = (url) => {
    setPlayingTrack(url);
  };

  const handlePause = () => {
    setPlayingTrack(null);
  };

  

  return (
    <div className="App">
      {isSaving ? (
        <div className="loading-screen">Saving...</div>
      ) : (
        <>
        <div className="header">
        <img className="logo" src={logo} alt="logo" />
          <h1 className="heading-h1">JAMN</h1>
          </div>
          <div className="SearchBar-content" >
          <SearchBar
            onSearchResults={handleSearchResults}
            initialTerm={searchTerm}
          />
          </div>
          {playlists.length > 0 && (
            <div className="saved-playlist">
              <div className="saved-playlist-content">
                <h2>Saved Playlists:</h2>
                <hr />

                <p>
                  <Playlists playlists={playlists} />
                </p>
              </div>
            </div>
          )}

          <div className="app-content">
            <div className="searchResults-container">
              <div className="searchResults-content">
                <SearchResults
                  searchResults={searchResults}
                  onAdd={handleAdd}
                  playlistTracks={playlistTracks}
                  playingTrack={playingTrack}
                  onPlay={handlePlay}
                  onPause={handlePause}
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
                  hasSearched={hasSearched}
                  playingTrack={playingTrack}
                  onPlay={handlePlay}
                  onPause={handlePause}
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
