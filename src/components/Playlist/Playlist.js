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
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(playlistName);
  const [isEdited, setIsEdited] = useState(false); // New state variable

  const toggleEdit = () => {
    if (inputValue !== "") {
      setIsEditing(!isEditing);
      setInputValue(playlistName); // Reset the input value when editing starts
    }
  };

  const handleNameChange = (value) => {
    console.log("Input value:", value); // Log the input value
    setInputValue(value); // Update the input value
    onNameChange(value);
    setIsEdited(true); // Set isEdited to true when the playlist name changes
  };

  const handleSave = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    console.log(trackURIs);
    console.log("Saving playlist with name:", playlistName); // Log the playlist name
    console.log("Track URIs:", trackURIs); // Log the track URIs
    // onRemove([]);
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
