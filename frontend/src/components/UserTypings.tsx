import Caret from "./Caret";

const UserTypings = ({
  userInput,
  className,
  words,
}: {
  userInput: string;
  className?: string;
  words: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => (
        <Character char={char} key={index} expected={words[index]} />
      ))}
      <Caret />
    </div>
  );
};

const Character = ({ char, expected }: { char: string; expected: string }) => {
  const isCorrect = char === expected;
  const isWhitespace = char === " ";

  return (
    <span
      className={cn({
        "text-primary-500": isCorrect,
        "text-red-500": !isCorrect && !isWhitespace,
        "bg-red-200": isWhitespace && !isCorrect,
      })}
    >
      {expected}
    </span>
  );
};

function cn(classes: { [key: string]: boolean }) {
  return Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(" ");
}

export default UserTypings;
