/**
 * Returns random number between 1 and maxNumber in the argument
 */
export async function getRandomNumber(maxNum: number): Promise<number> {
  return Math.floor(Math.random() * maxNum) + 1;
}

/**
 * Returns random number between two numbers in the arguments
 */
export async function getRandomNumberBetweenTwoNumbers(
  minNum: number,
  maxNum: number
): Promise<number> {
  const num = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
  return num;
}

/**
 * Returns random document name
 * //01.01.2023 -> 01012023
 */
export async function getRandomDocumentName(): Promise<string> {
  // dd
  const firstChar = String(await getRandomNumberBetweenTwoNumbers(0, 3));
  // TODO: if (firstChar === 3 )
  const secondChar = String(await getRandomNumberBetweenTwoNumbers(0, 9));
  // MM
  const thirdChar = String(await getRandomNumberBetweenTwoNumbers(0, 1));
  const fourthChar = String(await getRandomNumberBetweenTwoNumbers(0, 9));
  // yyyy
  //   const fifthChar = String(await getRandomNumberBetweenTwoNumbers(2, 2));
  //   const sixthChar = String(await getRandomNumberBetweenTwoNumbers(0, 0));
  //   const seventhChar = String(await getRandomNumberBetweenTwoNumbers(2, 2));
  //   const eighthChar = String(await getRandomNumberBetweenTwoNumbers(3, 3)); // '[object Promise]'

  const luckyDate = String(
    `${firstChar}${secondChar}${thirdChar}${fourthChar}${new Date().getFullYear()}`
  );

  return luckyDate;
}
