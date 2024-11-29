import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  onEnded: () => void;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, onEnded, autoPlay = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (autoPlay) {
        audioRef.current.play();
      }
    }
  }, [audioUrl, autoPlay]);

  return (
    <audio
      ref={audioRef}
      src={audioUrl}
      onEnded={onEnded}
      controls
      className="hidden"
    />
  );
};

export default AudioPlayer;