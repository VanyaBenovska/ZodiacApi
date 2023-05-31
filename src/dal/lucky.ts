import { database } from "../libs/database";
import { getRandomNumberBetweenTwoNumbers } from "../randomizer";
import { numbersToSignsBG } from "../models/signs";

export async function getLuckyTextByRandomNumber(): Promise<string> {
  const luckySign = Number(getRandomNumberBetweenTwoNumbers(1, 12));
  // Note! Sign names up to https://zodiac.dir.bg
  const sign = String(numbersToSignsBG.get(luckySign));
  try {
    const db = database.firestore();
    const signDataRef = db.collection("signs_ZodiacDirBG").doc(sign);
    const doc = await signDataRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      const fieldton = doc.get("data");
      const recordsLength = fieldton.length;
      const luckyNumber = Number(
        getRandomNumberBetweenTwoNumbers(0, recordsLength)
      );
      const luckyRecord = fieldton[luckyNumber];
      const luckyText = luckyRecord["text"];
      return luckyText;
    }
  } catch (err) {
    console.log(err);
  }
  return "";
}
