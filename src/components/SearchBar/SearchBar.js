import React, { useState } from "react";
import "./SearchBar.css";
import Spotify from "../../Utils/Spotify";

function SearchBar({ onSearchResults }) {
  const [term, setTerm] = useState("");

  const handleTermChange = (event) => {
    const newTerm = event.target.value;
    if (newTerm !== term) {
      setTerm(newTerm);
    }
  };

  const handleSearch = () => {
    console.log('Search button clicked');

    if (term.trim() !== "") {
      Spotify.search(term)
        .then((searchResults) => {
          console.log('Spotify.search results:', searchResults);
          setTerm(searchResults);
          onSearchResults(searchResults);
        })
        .catch((error) => {
          console.log("Error searching for tracks:", error.message);
        });
    } else {
      console.log("Please enter a search term.");
    }
  };

  console.log('Rendering search results');
  return (
      <div className="SearchBarContainer">
        <div className="SearchBar">
          <input
            className="searchInput"
            placeholder="Enter A Song, Album, or Artist"
            onChange={handleTermChange}
          />

          <button className="SearchButton" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      </div>
    );
  }


export default SearchBar;
