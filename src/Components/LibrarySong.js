import React from "react";
import {playAudio} from '../util';

const LibrarySong = ({song, songs, setCurrentSong, audioRef, isPlaying, setSongs}) => {
    const songSelectHandler = () => {
        setCurrentSong(song);
        // Add Active State for current song
        const newSongs = songs.map((selectedSong)=> {
          if(selectedSong.id === song.id){
            return{
              ...selectedSong,
              active: true,
            }
          }else{
            return{
              ...selectedSong,
              active: false,
            }
          }
        });
        setSongs(newSongs);
        // check if the song is playing
        playAudio(isPlaying, audioRef);
    };
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong;