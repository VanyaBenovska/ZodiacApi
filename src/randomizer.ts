/**
 * Returns random number between 1 and maxNumber in the argument
 */
export function getRandomNumber(maxNum: number): number {
  return Math.floor(Math.random() * maxNum) + 1;
}

/**
 * Returns random number between two numbers in the arguments, including min and max numbers
 */
export function getRandomNumberBetweenTwoNumbers(
  min: number,
  max: number
): number {
    max += 1;
    const luckySignNumber = Math.floor(Math.random() * (max - min) + min);
   return luckySignNumber;
}
