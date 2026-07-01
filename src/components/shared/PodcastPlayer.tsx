"use client";

import React, { useState, useRef, useEffect } from "react";

interface PodcastPlayerProps {
  audioUrl: string;
  episodeNumber: string;
  durationLabel: string;
}

export const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  audioUrl,
  episodeNumber,
  durationLabel,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  // Sync state with HTML5 audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Handle play/pause action
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => console.log("Play failed:", err));
      setIsPlaying(true);
    }
  };

  // Format time (e.g. 1:14 or 45:10)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle progress bar seek clicking
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progress = progressRef.current;
    if (!audio || !progress || duration === 0) return;

    const rect = progress.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    
    audio.currentTime = percentage * duration;
  };

  // Handle volume bar clicking
  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const volumeBar = volumeRef.current;
    if (!audio || !volumeBar) return;

    const rect = volumeBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));

    audio.volume = percentage;
    setVolume(percentage);
    setIsMuted(percentage === 0);
  };

  // Toggle Mute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentVolumePercentage = isMuted ? 0 : volume * 100;

  return (
    <div className="bg-neutral-50 dark:bg-petrol-900/40 border border-neutral-200/85 dark:border-petrol-800/80 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 rounded-none shadow-xs w-full">
      {/* Hidden HTML5 Audio Element */}
      <audio ref={audioRef} src={audioUrl} />

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full border border-neutral-300 dark:border-petrol-800 bg-white dark:bg-petrol-900 flex items-center justify-center text-petrol-950 dark:text-neutral-200 hover:bg-petrol-950 dark:hover:bg-white hover:text-white dark:hover:text-petrol-950 transition-colors shadow-xs cursor-pointer shrink-0 group/play focus:outline-none"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Episode Label Stack */}
      <div className="shrink-0 text-left space-y-0.5 select-none">
        <div className="text-xs font-bold text-petrol-950 dark:text-white">
          Ep. {episodeNumber}
        </div>
        <div className="text-[10px] text-neutral-400 dark:text-neutral-400 font-semibold">
          {isPlaying ? "PLAYING" : "PAUSED"}
        </div>
      </div>

      {/* Progress Slider Bar */}
      <div className="flex-grow flex items-center gap-3 w-full">
        <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-400 w-10 text-left select-none">
          {formatTime(currentTime)}
        </span>
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="flex-grow h-1 bg-neutral-200 dark:bg-petrol-800 relative cursor-pointer group py-1"
        >
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-neutral-200 dark:bg-petrol-800">
            {/* Played timeline */}
            <div
              className="absolute top-0 left-0 h-full bg-green-700 dark:bg-green-500"
              style={{ width: `${progressPercentage}%` }}
            />
            {/* Knob */}
            <div
              className="absolute top-1/2 w-3 h-3 bg-neutral-900 dark:bg-white border border-white dark:border-petrol-900 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ left: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-400 w-12 text-right select-none">
          {duration > 0 ? formatTime(duration) : durationLabel}
        </span>
      </div>

      {/* Volume Control */}
      <div className="shrink-0 flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle Mute"
        >
          {isMuted ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3L9 19.5V4.5z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
            </svg>
          )}
        </button>
        <div
          ref={volumeRef}
          onClick={handleVolumeClick}
          className="w-16 h-1 bg-neutral-200 dark:bg-petrol-800 relative cursor-pointer py-1 group"
        >
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-neutral-200 dark:bg-petrol-800">
            <div
              className="absolute top-0 left-0 h-full bg-neutral-400 dark:bg-petrol-600"
              style={{ width: `${currentVolumePercentage}%` }}
            />
            <div
              className="absolute top-1/2 w-2.5 h-2.5 bg-neutral-900 dark:bg-white border border-white dark:border-petrol-900 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ left: `${currentVolumePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
