import React, {useState, useRef} from "react";
import './styles/app.scss';

// Adding components
import Player from './Components/Player';
import Song from './Components/Song';
import Library from './Components/Library'
import Nav from './Components/Nav';

// Import Util
import data from './data'

import {playAudio} from './util';

function App() {
  // Ref
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
});
const [libraryStatus, setLibraryStatus] = useState(false);

  // Handler
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round(((roundedCurrent / roundedDuration)*100));

    setSongInfo({... songInfo, currentTime: current, duration, animationPercentage: animation }); // duration var has same name so don't need to type it twice
};
const skipTrackHandler = direction => {
  let currentIndex = songs.findIndex(song => song.id === currentSong.id);
  if (direction === 'skip-back'){
      setCurrentSong(songs[currentIndex - 1] || songs[songs.length-1]);
  } else if (direction === 'skip-forward') {
      setCurrentSong(songs[currentIndex + 1] || songs[0]);
  }
  playAudio(isPlaying, audioRef);
}

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player 
        setIsPlaying={setIsPlaying} 
        isPlaying={isPlaying} 
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        skipTrackHandler={skipTrackHandler}
      />
      <Library 
        audioRef={audioRef} 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio 
          onLoadedMetadata={timeUpdateHandler} 
          onTimeUpdate={timeUpdateHandler} 
          ref={audioRef} 
          src={currentSong.audio}
          onEnded={() => skipTrackHandler("skip-forward") }
      ></audio>
    </div>
  );
}

export default App;
