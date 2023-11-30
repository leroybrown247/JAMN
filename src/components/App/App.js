import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Jamn Playlist</h1>
        <SearchBar />
        <header className="App-playlist"></header>
        <SearchResults />
        <Playlist />
      </div>
    );
  }
}

export default App;
