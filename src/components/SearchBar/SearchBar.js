import React from "react";
import "./SearchBar.css";
import Spotify from "../../Utils/Spotify";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
  }

    // Define the method to handle user input

    handleTermChange = (event) => {
      this.setState({
        term: event.target.value,
      });
    };

    // Define a method to handle the search button click

    handleSearch = () => {
      const { term } = this.state;

      if (term.trim() !== "") {
        Spotify.search(term)
          .then((searchResults) => {
            this.props.onSearchResults(searchResults);
          })
          .catch((error) => {
            console.log("Error searching for tracks:", error.message);
          });
      } else {
        console.log("Please enter a search term.");
      }
    };

  render() {
    return (
      <div className="SearchBarContainer">
        <div className="SearchBar">
          <input
            className="searchInput"
            placeholder="Enter A Song, Album, or Artist"
            onChange={this.handleTermChange}
          />

          <button className="SearchButton" onClick={this.handleSearch}>
            SEARCH
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
