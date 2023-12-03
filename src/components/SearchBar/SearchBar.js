import React from "react";
import "./SearchBar.css";
import Spotify from "../../Utils/Spotify";

class SearchBar extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    term: ""
  }

  // Define the method to handle user input

  handleTermChange = (event) => {
    this.setState({
      term: event.target.value
    })
  }

// Define a method to handle the search button click

handleSearch = () => {
  const { term } = this.state;



}

  render() {
    return ( 
    <div className="SearchBarContainer">       
      <div className="SearchBar">
        <input className="searchInput" placeholder="Enter A Song, Album, or Artist" />
        <button className="SearchButton">SEARCH</button>
      </div>
    </div>
    )
    
  }
}

export default SearchBar;
