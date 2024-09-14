export function formatPercentage(num: number): string {
  return `${num.toFixed(0)}%`;
}

export const countErrors = (actual: string, expected: string) => {
  const expectedChars = expected.split("");

  return expectedChars.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    return errors + (actualChar === expectedChar ? 0 : 1);
  }, 0);
};

export const calculatedAccuracy = (total: number, errors: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }
  return 0;
};

export const calculateWPM = (correctTyped: number, timeSeconds: number) => {
  const words = correctTyped / 5;
  const minutes = timeSeconds / 60;
  return words / minutes + " WPM";
};

export const calculateWPMNum = (
  correctTyped: number,
  timeSeconds: number,
): number => {
  const words = correctTyped / 5;
  const minutes = timeSeconds / 60;
  const wpm = words / minutes;
  return Math.round(wpm);
};
