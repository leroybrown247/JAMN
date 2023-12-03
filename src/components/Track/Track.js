import React from "react";
import "./Track.css";

class Track extends React.Component {
  handleRemove = () => {
    const { track, onRemove } = this.props;
    onRemove(track);
  };

  render() {
    const { name, artist, album } = this.props.track;

    return (
      <div className="Track">
        <h3>{name}</h3>
        <div className="trackInfo-container">
          <div className="trackInfo-content">
            <p>
              {artist} | {album}
            </p>
          </div>
          <button className="trackAction-btn" onClick={this.handleRemove}>
            -
          </button>
        </div>
      </div>
    );
  }
}

export default Track;
