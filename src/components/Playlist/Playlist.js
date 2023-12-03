import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

class Playlist extends React.Component {

  state = {
    isEditing: false,
  };

  toggleEdit = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  }

  handleNameChange = (event) => {
    const { onNameChange } = this.props;

    onNameChange(event.target.value);
  }

  handle = () => {
    const { playlistTracks } = this.props;
    const trackURIs = playlistTracks.map((track) => track.uri);
    console.log(trackURIs);
    this.props.onRemove([]);

  }

  render() {
    const { playlistName, playlistTracks } = this.props;
    const { isEditing } = this.state;

    return (
      <div className="leadPlaylist-container">
        <div className="playlist">

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

            <Tracklist tracks={playlistTracks} onRemove={this.props.onRemove} />

          <button className="Playlist-btn" onClick={this.handleSave}>SAVE</button>
          
        </div>
      </div>
    )
  }
}

export default Playlist;
