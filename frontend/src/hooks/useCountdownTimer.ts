import { useCallback, useEffect, useRef, useState } from "react";

const useCountdownTimer = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  const intervalRef = useRef<number | null>(null);

  const startCountdown = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        return timeLeft - 1;
      });
    }, 1000);
  }, [setTimeLeft]);

  const stopCountdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetCountdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!timeLeft && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft, intervalRef]);

  return { timeLeft, startCountdown, resetCountdown, stopCountdown };
};

export default useCountdownTimer;
