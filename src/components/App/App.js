import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props); // Call the super method on the first line of the constructor method
    // Initial state of the searchResults array is set to an array of three objects
    this.state = {
      searchResults: [
        { name: "name1", artist: "artist1", album: "album1", id: 1 },
        { name: "name2", artist: "artist2", album: "album2", id: 2 },
        { name: "name3", artist: "artist3", album: "album3", id: 3 },
        // Hardcoded values for the playlistName and playlistTracks states
      ],
      playlistName: "My Playlist",
      playlistTracks: [
        {
          id: "4",
          name: "Playlist Track 1",
          artist: "Playlist Artist 1",
          album: "Playlist Album 1",
        },
        {
          id: "5",
          name: "Playlist Track 2",
          artist: "Playlist Artist 2",
          album: "Playlist Album 2",
        },
      ],
    };
  }
  // this.handleRemove = this.handleRemove.bind(this);

  // Define a method to handle playlistName changes

  handleNameChange = (newName) => {
    this.setState({ playlistName: newName });
  };

  // Define a method to handle adding a track to the playlist

  handleRemove(updatedPlaylist) {
    this.setState({ playlistTracks: updatedPlaylist });
  }

  render() {
    return (
      <div className="App">
        <h1>JAMN!</h1>
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} />
          <h2>PLAYLIST</h2>
          <Playlist
            playlistName={this.setState.playlistName}
            playlistTracks={this.setState.playlistTracks}
            onNameChange={this.handleNameChange} // Pass the handleNameChange method to the Playlist component
            onRemove={this.handleRemove} // Pass the handleRemove method to the Playlist component
          />
        </div>
      </div>
    );
  }
}

export default App;
