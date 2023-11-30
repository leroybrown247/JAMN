import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  render() {
    return ( 
    <div className="SearchBarContainer">       
      <div className="SearchBar">
        <input className="searchInput" placeholder="Enter A Song, Album, or Artist" />
        <div className="iconContainer">

        <button className="SearchButton">SEARCH</button>
        </div>
      </div>
    </div>
    )
    
  }
}

export default SearchBar;
