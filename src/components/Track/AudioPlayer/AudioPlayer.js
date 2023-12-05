import React, { useEffect, useRef } from 'react';
import './AudioPlayer.css';

function AudioPlayer({ url, playingTrack, onPlay, onPause }) {
  // const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (playingTrack === url) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playingTrack, url]);

  const togglePlaying = () => {
    if (playingTrack === url) {
      onPause();
    } else {  
    onPlay(url);
  };
};

  return (
    <div className="audio-player">
      <button className="toggle-button" onClick={togglePlaying}>
        {playingTrack === url ? 'Pause' : 'Play'}
      </button>
      <audio ref={audioRef} src={url} />
    </div>
  );
}

export default AudioPlayer;