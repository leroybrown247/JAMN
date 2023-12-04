import React, { useState, useEffect } from "react"; // Import useEffect
import "./SearchBar.css";
import Spotify from "../../Utils/Spotify";

function SearchBar({ onSearchResults }) {
  const [term, setTerm] = useState("");

  // Call Spotify.getAccessToken() when the component mounts
  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const handleTermChange = (event) => {
    const newTerm = event.target.value;
    if (newTerm !== term) {
      setTerm(newTerm);
    }
  };

  const handleSearch = () => {
    console.log('Search button clicked');
    console.log('Rendering search results');

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

  return (
      <div className="SearchBarContainer">
        <div className="SearchBar">
          <input
            className="searchInput"
            placeholder="Enter song, album, or artist"
            onChange={handleTermChange}
            autoFocus
          />

          <button className="SearchButton" onClick={() => handleSearch(term)}>
            SEARCH
          </button>
        </div>
      </div>
    );
  }


export default SearchBar;