import React from "react"
import Track from "../Track/Track"
import "./Tracklist.css"

class Tracklist extends React.Component {
    render() {
      return (
<div className="Tracklist">
          <h2>Tracklist</h2>
          {/*Map through tracks*/}
          <Track />
      </div>

      )
    }
  }
  
export default Tracklist;