import React, {useState} from "react";
import './styles/app.scss';

// Adding components
import Player from './Components/Player';
import Song from './Components/Song';

// Import Util
import data from './util'

function App() {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <h1>Music Player</h1>
      <Song currentSong={currentSong}/>
      <Player setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong} />
    </div>
  );
}

export default App;
