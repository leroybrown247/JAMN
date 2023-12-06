import React, { useState } from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

function Playlist({
  playlistName,
  playlistTracks,
  onRemove,
  onNameChange,
  onSave,
  hasSearched,
  onPlay,
  playingTrack,
  onPause,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(playlistName);
  const [isEdited, setIsEdited] = useState(false);

  const toggleEdit = () => {
    if (inputValue !== "") {
      setIsEditing(!isEditing);
      setInputValue(playlistName);
    }
  };

  const handleNameChange = (value) => {
    console.log("Input value:", value);
    setInputValue(value);
    onNameChange(value);
    setIsEdited(true);
  };

  const handleSave = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    console.log(trackURIs);
    console.log("Saving playlist with name:", playlistName);
    console.log("Track URIs:", trackURIs);
    onSave();
  };

  return (
    <div className="leadPlaylist-container">
      <div className="playlist">
        {isEditing ? (
          <input
            data-testid="playlist-input"
            className="playlistInput"
            value={inputValue}
            defaultValue={playlistName}
            onBlur={toggleEdit}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder={isEditing ? "" : playlistName}
            onFocus={() => {
              console.log("Input focused, input cleared");
              handleNameChange("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                toggleEdit();
              }
            }}
            autoFocus
          />
        ) : (
          <h2 className="playlistTitle" onClick={toggleEdit}>
            {playlistName}
          </h2>
        )}
        <hr></hr>
        <Tracklist
          tracks={playlistTracks}
          onRemove={onRemove}
          isRemoval={true}
          onPlay={onPlay}
          playingTrack={playingTrack}
          onPause={onPause}
        />
        {(isEdited || hasSearched) && (
          <button className="Playlist-btn" onClick={handleSave}>
            ADD PLAYLIST TO SPOTIFY
          </button>
        )}
      </div>
    </div>
  );
}

export default Playlist;
