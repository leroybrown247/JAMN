import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./SearchResults.css";

class SearchResults extends React.Component {
  render() {

const { searchResults } = this.props; // Destructuring

    return (
      <div className="SearchResultsContainer">
        <div className="SearchResults">
          <h2>Search Results</h2>
          {searchResults && <Tracklist tracks={ searchResults } />}
        </div>
      </div>
    );
  }
}

export default SearchResults;
