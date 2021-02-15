import react from "react";
import './styles/app.scss';

// Adding components
import Player from './Components/Player';
import Song from './Components/Song';
import Util from './util'


function App() {
  return (
    <div className="App">
      <h1>Music Player</h1>
      <Song />
      <Player />
    </div>
  );
}

export default App;
