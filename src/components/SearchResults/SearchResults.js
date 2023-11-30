import React from "react";
import "./SearchResults.css";

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResultsContainer">
        <div className="SearchResults">
          <h2>Search Results</h2>
          {/*Show tracklist*/}
          <tracklist />
        </div>
      </div>
    );
  }
}

export default SearchResults;
