import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

function Tracklist({ tracks, onAdd, isRemoval }) {
  console.log("Tracks:", tracks);
  return (
    <div className="Tracklist">
      {tracks &&
        tracks.map((track, index) => (
          <React.Fragment key={track.id}>
            <Track track={track} onAdd={onAdd} isRemoval={isRemoval} />
            {index < tracks.length - 1 && <hr />}
          </React.Fragment>
        ))}
    </div>
  );
}

export default Tracklist;
