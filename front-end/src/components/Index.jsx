import {useRef, createContext, useContext } from "react";
import Home from "./Home";

export const soundContext = createContext(null);
export default function Index (){
    
    const audioRef = useRef(null);
    const playSound = ()=>{
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    }

    return(
        <>
        <soundContext.Provider value={playSound}>
            <Home/>
            <audio controls id="music" ref={audioRef}>
            <source src="/audio/btn-sound.mp3" type="audio/mpeg"/>
            </audio>
        </soundContext.Provider>
        </>
    );
}
