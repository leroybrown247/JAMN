import React from "react"
import "./Track.css"

class Track extends React.Component {
    render() {
      const { name, artist, album } = this.props.track; // Destructuring

      return (
        <div className="Track">
            <div className="Track-information">
                <h3>{name}</h3>
                {/*Track information*/}
                <p>{artist} | {album}</p>
                </div>
          <button className="Track-action">+ or - Button</button>
      </div>
      )
    }
  }
  
export default Track;