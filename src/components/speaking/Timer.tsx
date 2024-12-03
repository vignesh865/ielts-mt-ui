import React, { useState, useEffect } from 'react';

interface TimerProps {
  duration: number;
  onTimeEnd: () => void;
  label?: string;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeEnd, label = "Time" }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeEnd();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeEnd]);

  return (
    <div className="text-center">
      <span className="font-mono text-xl">
        {label}: {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
        {String(timeLeft % 60).padStart(2, '0')}
      </span>
    </div>
  );
};

export default Timer;
