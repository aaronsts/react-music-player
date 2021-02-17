import React, {useEffect} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPlay, 
    faAngleLeft, 
    faAngleRight, 
    faPause
} from '@fortawesome/free-solid-svg-icons';

const Player = ({audioRef, currentSong, isPlaying, setIsPlaying, songInfo, setSongInfo, setCurrentSong, songs, setSongs}) => {
    // UseEffect
        useEffect(() => {
            const newSongs = songs.map((selectedSong)=> {
                if(selectedSong.id === currentSong.id){
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
        },[currentSong]);

    // Event handlers
    const playSongHandler = () => {
       if(isPlaying){
           audioRef.current.pause();
           setIsPlaying(!isPlaying); // Set state to opposite of what it was on click
       } else{
           audioRef.current.play();
           setIsPlaying(!isPlaying);
       }
    }

    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor( time % 60 )).slice(-2) // format the seconds to minutes and seconds
        );
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    };

    const skipTrackHandler = direction => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id);
        if (direction === 'skip-back'){
            setCurrentSong(songs[currentIndex - 1] || songs[songs.length-1]);
        } else if (direction === 'skip-forward') {
            setCurrentSong(songs[currentIndex + 1] || songs[0]);
        }
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime} 
                    type='range' 
                    onChange={dragHandler}
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className='skip-back' size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className='play' size='2x' 
                    icon={isPlaying ? faPause : faPlay} 
                /> {/* ternary operator to change icon */}
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className='skip-forward' size='2x' icon={faAngleRight} />
            </div>
        </div>
    );
}

export default Player;