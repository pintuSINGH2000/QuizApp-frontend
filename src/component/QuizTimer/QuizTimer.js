import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';

const QuizTimer = ({ duration, onTimeUp,resetKey,styles }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerIdRef = useRef(null);

  useEffect(() => {
    // Clear the timer if it exists
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }

    // Reset timeLeft to the new duration
    setTimeLeft(duration);

    // Start the timer
    timerIdRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timerIdRef.current);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function to clear the timer
    return () => clearInterval(timerIdRef.current);
     //eslint-disable-next-line
  }, [duration, resetKey]);
  return (
    <div className={styles}>
      {moment.utc(timeLeft * 1000).format("mm:ss")}
    </div>
  );
};

export default QuizTimer;