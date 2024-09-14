import useEngine from "@/hooks/useEngine";
import UserTypings from "@/components/UserTypings";
import { useGetNote } from "@/hooks/useGetNote";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Result from "@/components/Result";
import RestartButton from "@/components/RestartButton";
import {
  calculatedAccuracy,
  calculateWPMNum,
  countErrors,
} from "../utils/helper";
import { useUploadMyWPM } from "@/mutations/result";
import { Button } from "@radix-ui/themes";

export const TypingDashboard = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const { mutate: wpmMutation, isPending } = useUploadMyWPM();

  useEffect(() => {
    if (!id) {
      setTimeout(() => {
        navigate("/upload");
      }, 3000);
    }
  }, [id, navigate]);

  const words = useGetNote(id || "", () => {});

  const {
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
  } = useEngine();

  const [errors, setErrors] = useState(0);

  const areWordsFinished = cursor == words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, Math.min(cursor, words.length));

    setErrors(
      (prevErrors: number) => prevErrors + countErrors(typed, wordsReached),
    );
  }, [typed, words, cursor]);

  useEffect(() => {
    if (timeLeft === 0 && state == "run") {
      setState("finish");
      sumErrors();
      setCountdownSeconds(0);
    }
  }, [timeLeft, state, sumErrors]);

  useEffect(() => {
    if (areWordsFinished && state == "run") {
      setState("finish");
      sumErrors();
      stopCountdown();
    }
  }, [clearTyped, sumErrors, resetCountdown, areWordsFinished]);

  const restart = useCallback(() => {
    resetCountdown();
    resetTotalTyped();
    setState("start");
    clearTyped();
    setErrors(0);
    setCountdownSeconds(30);
  }, [clearTyped, resetCountdown, resetTotalTyped, setCountdownSeconds]);

  const handleUpload = () => {
    wpmMutation(calculateWPMNum(totalTyped - errors, 30 - timeLeft));
  };

  return (
    <>
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainter>
        <GenerateWords
          words={words || "Please upload and choose one article..."}
        />
        <UserTypings
          userInput={typed}
          className="absolute inset-0"
          words={words!}
        />
      </WordsContainter>

      <RestartButton
        className={"mx-auto mt-10 text-slate-500"}
        onRestart={() => restart()}
      />
      <Result
        state={state}
        errors={errors}
        accuracyPercentage={calculatedAccuracy(totalTyped, errors)}
        total={totalTyped}
        className={"mt-10"}
        timeLeft={timeLeft}
      />

      {state === "finish" && (
        <Button
          className="cursor-pointer"
          disabled={isPending}
          onClick={handleUpload}
        >
          Upload my WPM (Words per Minute)
        </Button>
      )}
    </>
  );
};

const WordsContainter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-xl leading-relaxed break-all">
      {children}
    </div>
  );
};

const GenerateWords = ({ words }: { words: string }) => {
  return <div className="dark:text-slate-500 text-black">{words}</div>;
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return (
    <h2 className="dark:text-primary-400 text-green-500 font-medium mb-2">
      Time: {timeLeft}
    </h2>
  );
};
