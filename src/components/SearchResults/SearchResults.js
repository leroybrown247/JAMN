import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./SearchResults.css";

class SearchResults extends React.Component {
  render() {

// remove hard-coded tracks and replace with this.props.searchResults

    return (
      <div className="SearchResultsContainer">
        <div className="SearchResults">
          <h2>Search Results</h2>
           <Tracklist tracks={ this.props.searchResults } />
        </div>
      </div>
    );
  }
}

export default SearchResults;
