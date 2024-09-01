import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { TbMusicOff } from "react-icons/tb";
import { TbMusic } from "react-icons/tb";
import GameMusic from "../../../util/sound_effect/sound/gamemusic.mp3";
import { loadAudio } from "../../../util/sound_effect/sound_effect.util";
export default function MasterContainer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    if (!audioRef.current) {
      try {
        const music = await loadAudio(GameMusic);
        audioRef.current = music;
        music.play().catch((error) => {
          console.error("Error playing music:", error);
        });
        setIsPlaying(true);
      } catch (error) {
        console.error("Error loading music:", error);
      }
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing music:", error);
      });
      setIsPlaying(true);
    }
  };
  const handleStop = async () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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
