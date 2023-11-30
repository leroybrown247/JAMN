import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

class Playlist extends React.Component {
  // Pass the track property to the onRemove method
  handleRemove = (track) => {
    const { playlistTracks, onRemove } = this.props;

    // Check if the track is in the playlistTracks state
    const updatedPlaylist = playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
    // Update the playlistTracks state

    onRemove(track);
  };

  render() {
    const { playlistName, playlistTracks } = this.props;

    return (
      <div className="Playlist">
        <h2>Jamn Playlist</h2>
        <input defaultValue={playlistName} />
        {/*Pass the onRemove method to the Tracklist component*/}
        <Tracklist tracks={playlistTracks} onRemove={this.handleRemove} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;
