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

    handleTermChange = (event) => {

const newTerm = event.target.value;
if (newTerm !== this.state.term) {

      this.setState({
        term: newTerm,
      });
    };
  };

    handleSearch = () => {
      console.log('Search button clicked');
      const { term } = this.state;

      if (term.trim() !== "") {

        Spotify.search(term)
  .then((searchResults) => {
    console.log('Spotify.search results:', searchResults);
    this.setState({ term: searchResults }, () => {
      this.props.onSearchResults(this.state.term);
    });

  })
  .catch((error) => {
    console.log("Error searching for tracks:", error.message);
  });

      } else {
        console.log("Please enter a search term.");
      }
    };

  render() {
    console.log('Rendering search results');
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
