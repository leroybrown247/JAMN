import React from "react"
import Tracklist from "../Tracklist/Tracklist"
import "./Playlist.css"

class Playlist extends React.Component {
    render() {
      return (
<div className="Playlist">
          <h2>Jamn Playlist</h2>
          <Tracklist />
          <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>

      )
    }
  }
  
export default Playlist;