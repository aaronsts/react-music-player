import React, {useEffect} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPlay, 
    faAngleLeft, 
    faAngleRight, 
    faPause
} from '@fortawesome/free-solid-svg-icons';

const Player = ({audioRef, currentSong, isPlaying, setIsPlaying, songInfo, setSongInfo, setCurrentSong, songs, setSongs, skipTrackHandler}) => {
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

    // Add styling
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div 
                    style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
                    }} 
                    className="track"
                >
                    <input 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        type='range' 
                        onChange={dragHandler}
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
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