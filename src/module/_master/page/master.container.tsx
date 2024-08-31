import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
const music = new Audio("/sound/game_music.mp3");
import { TbMusicOff } from "react-icons/tb";
import { TbMusic } from "react-icons/tb";

export default function MasterContainer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(music);
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;
      setIsPlaying(true);
    }
  };
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <div className="bg-blue-500 h-screen w-screen">
      {isPlaying ? (
        <button className="text-xl justify-center border-2 flex items-center  h-12 w-12 rounded-full  fixed top-5 right-5 z-30" onClick={handleStop}>
          <TbMusic />
        </button>
      ) : (
        <button className="text-xl border-2 flex justify-center items-center  h-12 w-12 rounded-full fixed top-5 right-5 z-30" onClick={handlePlay}>
          <TbMusicOff />
        </button>
      )}

      <Outlet />
    </div>
  );
}
