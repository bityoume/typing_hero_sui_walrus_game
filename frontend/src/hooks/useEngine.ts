import { useEffect, useState } from "react";
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";

export type State = "start" | "run" | "finish";
const initialTime = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const [countdownSeconds, setCountdownSeconds] = useState(initialTime);

  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(
    state == "finish",
    countdownSeconds,
  );

  const { timeLeft, startCountdown, resetCountdown, stopCountdown } =
    useCountdownTimer(countdownSeconds);

  const isStarting = state === "start" && cursor > 0;

  // 开始敲击，计时开始
  useEffect(() => {
    if (isStarting && countdownSeconds > 0) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown, countdownSeconds]);

  return {
    state,
    timeLeft,
    typed,
    setState,
    setCountdownSeconds,
    cursor,
    clearTyped,
    totalTyped,
    resetTotalTyped,
    resetCountdown,
    stopCountdown,
  };
};

export default useEngine;
