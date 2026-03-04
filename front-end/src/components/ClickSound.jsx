import {useRef, createContext, useContext } from "react";

export default function ClickSound (){
    const soundContext=createContext();
    const audioRef = useRef(null);
    const playSound = ()=>{
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    }

    return(
        <>
        <soundContext>
        <audio controls id="music" ref={audioRef}>
            <source src="/audio/btn-sound.mp3" type="audio/mpeg"/>
        </audio>
        <button onClick={playSound}>play</button>
        </soundContext>
        </>
    );
}
