import { ISignRecord } from "../interfaces/signs";

export function getText(arrayOfSignsObjects: {}[]): string {
  let allSignsTexts = "";
  const f = arrayOfSignsObjects.values();
  for (let x of f) {
    const signRecord = x as ISignRecord;
    allSignsTexts += signRecord.sign;
    allSignsTexts += ": ";
    allSignsTexts += signRecord.text;
    allSignsTexts += "\n";
  }
  return allSignsTexts;
}
