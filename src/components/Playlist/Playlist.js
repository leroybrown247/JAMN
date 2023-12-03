import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

class Playlist extends React.Component {

  // Define a state for the playlistName
  state = {
    isEditing: false,
  };

  // Define a method to toggle the isEditing state
  toggleEdit = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  }

  // Define a method to handle the playlistName change
  handleNameChange = (event) => {
    const { onNameChange } = this.props;

    // Update the playlistName state
    onNameChange(event.target.value);
  }

  // Define a method handle saving the playlist
  handle = () => {
    const { playlistTracks } = this.props;
    // Map over the playlistTracks array and return an array of track URIs
    const trackURIs = playlistTracks.map((track) => track.uri);
    // log the array of track URIs to the console
    console.log(trackURIs);
    // Implement the savePlaylist method
    this.props.onRemove([]);

  }

  render() {
    const { playlistName, playlistTracks } = this.props;
    const { isEditing } = this.state;

    return (
      <div className="leadPlaylist-container">
        <div className="playlist">
          {/* Render the playlistName as an input if editing is true */}

          {isEditing ? (
            
            <input 
            className="playlistInput" 
            defaultValue={playlistName} 
            onBlur={this.toggleEdit}
            onChange={this.handleNameChange}
            />

          ) : (
              <h2 className="playlistTitle" onClick={this.toggleEdit}>
                {playlistName}
              </h2>
            )}

            <Tracklist tracks={playlistTracks} onRemove={this.handleRemove} />

          <button className="Playlist-btn" onClick={this.handleSave}>SAVE</button>
          
        </div>
      </div>
    )
  }
}

export default Playlist;
