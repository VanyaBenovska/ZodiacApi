import { ISignRecord } from "../interfaces/signs";

export function getText(arrayOfSignsObjects: {}[]): string {
  let allSignsTexts = "";
  const arrayOfSignsObjectsValues = arrayOfSignsObjects.values();
  for (let record of arrayOfSignsObjectsValues) {
    const signRecord = record as ISignRecord;
    allSignsTexts += signRecord.sign;
    allSignsTexts += ": ";
    allSignsTexts += signRecord.text;
    allSignsTexts += "\n";
  }
  return allSignsTexts;
}
