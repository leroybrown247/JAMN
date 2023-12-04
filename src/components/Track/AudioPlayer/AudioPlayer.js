import React, { useState, useEffect, useRef } from 'react';
import './AudioPlayer.css';

function AudioPlayer({ url }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  return (
    <div className="audio-player">
      <button className="toggle-button" onClick={togglePlaying}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <audio ref={audioRef} src={url} />
    </div>
  );
}

export default AudioPlayer;