import React from "react"
import "./SearchResults.css"

class SearchResults extends React.Component {
    render() {
      return (
<div className="SearchResults">
          <h2>SearchResults</h2>
          {/*Show tracklist*/}
          <tracklist />
      </div>

      )
    }
  }
  
export default SearchResults();