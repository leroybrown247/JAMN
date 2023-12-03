import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: [],
    };
  }
  handleNameChange = (newName) => {
    this.setState({ playlistName: newName });
  };

  handleRemove = (updatedPlaylist) => {
    this.setState({ playlistTracks: updatedPlaylist });
  }

  handleResetPlaylist = () => {
    this.setState({ playlistTracks: [] });
  };

  handleSearchResults = (searchResults) => {
    this.setState({ searchResults: searchResults });
  }

  render() {
  const { playlistName, playlistTracks } = this.state;
  
    return (
      <div className="App">
        <h1>JAMN!</h1>
        <SearchBar onSearchResults={this.handleSearchResults} />
        <div className="app-content">
          <div className="searchResults-container">
            <div className="searchResults-content">
              <SearchResults searchResults={this.state.searchResults} />
            </div>
          </div>

          <div className="playlist-container">
            <div className="playlist-content">
              <h2>PLAYLIST</h2>
              <Playlist
                playlistName={playlistName}
                playlistTracks={playlistTracks}
                onNameChange={this.handleNameChange}
                onRemove={this.handleRemove}
                onReset={this.handleResetPlaylist}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
