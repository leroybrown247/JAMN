import React from "react";
import "./Track.css";
import AudioPlayer from "./AudioPlayer/AudioPlayer";

function Track({
  track,
  onAdd,
  onRemove,
  isRemoval,
  onPlay,
  playingTrack,
  onPause,
}) {
  const handleAdd = () => {
    onAdd(track.id);
  };

  const handleRemove = () => {
    onRemove(track.id);
  };

  const { name, artist, album } = track;

  return (
    <div className="Track">
      <h3>{name}</h3>
      <div className="trackInfo-container">
        <div className="trackInfo-content">
          <p>
            {artist} | {album}
          </p>
          <AudioPlayer
            url={track.previewUrl}
            playingTrack={playingTrack}
            onPlay={onPlay}
            onPause={onPause}
          />
        </div>
        {isRemoval ? (
          <button className="trackAction-btn" onClick={handleRemove}>
            -
          </button>
        ) : (
          <button className="trackAction-btn" onClick={handleAdd}>
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default Track;
