import React, { useState } from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange, onSave }) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleNameChange = (event) => {
    console.log("Input value:", event.target.value); // Log the input value
    onNameChange(event.target.value);
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
            defaultValue={playlistName}
            onBlur={toggleEdit}
            onChange={handleNameChange}
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
        <button className="Playlist-btn" onClick={handleSave}>
          ADD PLAYLIST TO SPOTIFY
        </button>
      </div>
    </div>
  );
}

export default Playlist;
