import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

interface RestartButtonProps {
  onRestart: () => void;
  className?: string;
}

const RestartButton = ({
  onRestart: handleRestart,
  className,
}: RestartButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    handleRestart();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`block rounded px-8 py-2 dark:hover:bg-slate-700/50 hover:bg-slate-100 text-slate-700 dark:text-slate-100 ${className}`}
    >
      <MdRefresh className="w-6 h-6" />
    </button>
  );
};

export default RestartButton;
