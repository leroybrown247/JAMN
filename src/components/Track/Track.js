import React from "react";
import "./Track.css";

function Track({ track, onAdd, onRemove, isRemoval }) {
  const handleAdd = () => {
    onAdd(track);
  };

  const handleRemove = () => {
    onRemove(track);
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
        </div>
        {!isRemoval ? (
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
