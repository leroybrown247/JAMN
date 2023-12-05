import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

function Tracklist({ tracks, onAdd, onRemove, isRemoval, onPlay, playingTrack, onPause }) {
  return (
    <div className="Tracklist">
      {tracks &&
        tracks.map((track, index) => (
          <React.Fragment key={track.id}>
            <Track
              track={track}
              onAdd={onAdd}
              onRemove={onRemove}
              isRemoval={isRemoval}
              onPlay={onPlay}
              playingTrack={playingTrack}
              onPause={onPause}
            />
            {index < tracks.length - 1 && <hr />}
          </React.Fragment>
        ))}
    </div>
  );
}

export default Tracklist;
