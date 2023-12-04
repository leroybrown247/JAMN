import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

// Passing the onRemove prop from the Playlist component to the Tracklist component fixed error "TypeError: onRemove is not a function"

function Tracklist({ tracks, onAdd, onRemove, isRemoval }) {
  console.log("Tracks:", tracks);
  return (
    <div className="Tracklist">
      {tracks &&
        tracks.map((track, index) => (
          <React.Fragment key={track.id}>
            <Track track={track} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval} />
            {index < tracks.length - 1 && <hr />}
          </React.Fragment>
        ))}
    </div>
  );
}

export default Tracklist;
