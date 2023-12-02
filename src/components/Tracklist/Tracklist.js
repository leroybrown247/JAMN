import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

class Tracklist extends React.Component {
  render() {
    const { tracks, onRemove } = this.props;

    return (
      <div className="Tracklist">
        {tracks &&
          tracks.map((track) => (
            <Track key={track.id} track={track} onRemove={onRemove} />
          ))}
      </div>
    );
  }
}

export default Tracklist;
