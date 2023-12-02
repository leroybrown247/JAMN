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


  // handleRemove = (track) => {
  //   const { playlistTracks, onRemove } = this.props;

  //   // Check if the track is in the playlistTracks state
  //   const updatedPlaylist = playlistTracks.filter(
  //     (playlistTrack) => playlistTrack.id !== track.id
  //   );
  //   // Update the playlistTracks state
  //   onRemove(updatedPlaylist);
  // };

  render() {
    const { playlistName, playlistTracks } = this.props;
    const { isEditing } = this.state;

    return (
      <div className="playlist-container">
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

          <button className="Playlist-btn">SAVE</button>
          
        </div>
      </div>
    )
  }
}

export default Playlist;
