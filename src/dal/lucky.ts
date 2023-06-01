import { database } from "../libs/database";
import { getRandomNumberBetweenTwoNumbers } from "../randomizer";
import { numbersSignsBG_zodiacDirBg } from "../models/signs";

export async function getLuckyTextByRandomNumber(): Promise<string> {
  const luckyNumber = getRandomNumberBetweenTwoNumbers(1, 12);
  // Note! Sign names up to https://zodiac.dir.bg
  const signObj = numbersSignsBG_zodiacDirBg.find(element => element.id === luckyNumber);
  const sign = signObj?.name;
  try {
    const db = database.firestore();
    const signDataRef = db.collection("signs_ZodiacDirBG").doc(sign);
    const doc = await signDataRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      const luckySignAllRecords = doc.get("data");
      const recordsLength = luckySignAllRecords.length;
      const luckyNumber = 
        getRandomNumberBetweenTwoNumbers(0, recordsLength - 1);
      const luckyRecord = luckySignAllRecords[luckyNumber];
      const luckyText = luckyRecord["text"];
      return luckyText;
    }
  } catch (err) {
    console.log(err);
  }
  return "";
}
