import react from "react";

// Adding components
import Player from './Components/Player';
import Song from './Components/Song';

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
