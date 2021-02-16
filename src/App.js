import React, {useState, useRef} from "react";
import './styles/app.scss';

// Adding components
import Player from './Components/Player';
import Song from './Components/Song';
import Library from './Components/Library'

// Import Util
import data from './util'

function App() {
  // Ref
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
});

  // Handler
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({... songInfo, currentTime: current, duration }) // duration var has same name so don't need to type it twice
};

  return (
    <div className="App">
      <h1>Music Player</h1>
      <Song currentSong={currentSong}/>
      <Player 
        setIsPlaying={setIsPlaying} 
        isPlaying={isPlaying} 
        currentSong={currentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library 
        audioRef={audioRef} 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
      />
      <audio 
          onLoadedMetadata={timeUpdateHandler} 
          onTimeUpdate={timeUpdateHandler} 
          ref={audioRef} 
          src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
