import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

class Tracklist extends React.Component {
  render() {
    const { tracks } = this.props; // Destructuring

    return (
      <div className="Tracklist">
        <h2>Tracklist</h2>
        {/*Map through tracks and render Track components*/}
        {tracks.map((track) => {
          return <Track track={track} key={track.id} />;
        })}
      </div>
    );
  }
}

export default Tracklist;
