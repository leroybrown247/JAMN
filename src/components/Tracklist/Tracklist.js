import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

// Note our error was occuring previously in this component. We were passing in a prop called "tracks" to Tracklist, but we were not using it. We were instead using a prop called "searchResults" which was undefined. We fixed this by changing the prop name to "tracks" in the Tracklist component.

function Tracklist({ tracks, onAdd, isRemoval }) {
  console.log("Tracks:", tracks);
  return (
    <div className="Tracklist">
      {tracks &&
        tracks.map((track) => (
            <Track key={track.id} track={track} onAdd={onAdd} isRemoval={isRemoval} />
        ))}
    </div>
  );
}

export default Tracklist;
