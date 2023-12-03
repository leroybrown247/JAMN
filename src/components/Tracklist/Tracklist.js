import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

class Tracklist extends React.Component {
  render() {
    const { tracks, onRemove } = this.props;

    return (
      <div className="Tracklist">
        {tracks &&
          tracks.map((track, index) => (
            <React.Fragment key={track.id}>
              <Track track={track} onRemove={onRemove} />
              {index < tracks.length - 1 && <hr />}
            </React.Fragment>
          ))}
      </div>
    );
  }
}

export default Tracklist;