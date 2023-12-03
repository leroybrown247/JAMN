import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./SearchResults.css";

class SearchResults extends React.Component {
  render() {
    console.log('State:', this.state);
  console.log('Props:', this.props);
    console.log('Search results:', this.props.searchResults);
    

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
