import { motion } from "framer-motion";
import { calculateWPM, formatPercentage } from "../utils/helper";

const Result = ({
  state,
  errors,
  accuracyPercentage,
  total,
  className,
  timeLeft,
}: {
  state: string;
  errors: number;
  accuracyPercentage: number;
  total: number;
  className?: string;
  timeLeft: number;
}) => {
  if (state !== "finish") return null;

  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  return (
    <motion.ul
      className={`${className} flex flex-col items-center dark:text-primary-400 text-green-500 space-y-3`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
      >
        Result
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        className="text-red-500"
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1.5 }}
      >
        Typed: {total}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        className="relative has-tooltip cursor-pointer flex gap-1 items-center"
        transition={{ duration: 0.3, delay: 2 }}
      >
        Speed: {calculateWPM(total - errors, 30 - timeLeft)}
      </motion.li>
    </motion.ul>
  );
};

export default Result;
