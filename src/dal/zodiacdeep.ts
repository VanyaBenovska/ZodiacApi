import { database } from "../libs/database";
import { SignData } from "../models/signData";
import { firestore } from "firebase-admin";

export async function GetArrayJSNatFromSignData(
  sign: string
): Promise<[{ createdAt: string; text: string }]> {
  try {
    const db = database.firestore();
    const signDataRef = db.collection("signs_ZodiacDirBG").doc(sign);
    const doc = await signDataRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      return doc.get("data");
    }
  } catch (err) {
    console.log(err);
  }
  return [{ createdAt: "", text: "" }];
}

export async function GetLastElementJSNatFromSignData(
  sign: string
): Promise<{ dateShortString: string; text: string }> {
  try {
    const db = database.firestore();
    const signDataRef = db.collection("signs_ZodiacDirBG").doc(sign);
    const doc = await signDataRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data: (1): ", doc.data());
      const fieldton = doc.get("data");
      const fieldOnlyOne = fieldton[fieldton.length - 1];
      const first = fieldOnlyOne["createdAt"];
      const second = fieldOnlyOne["text"];
      return {
        dateShortString: fieldOnlyOne["createdAt"],
        text: fieldOnlyOne["text"],
      };
    }
  } catch (err) {
    console.log(err);
  }
  return {
    dateShortString: "",
    text: "",
  };
}

/*
// Add today data object to the end of the data array 
*/
export async function AppendToArrayTodayElement(
  arrayData: [SignData],
  todayElement: SignData
): Promise<SignData[]> {
  arrayData.push(todayElement);
  return arrayData;
}

export async function isTodayRecordAbsent(
  sign: string,
  todayShortString: string
): Promise<boolean> {
  const obj = await GetLastElementJSNatFromSignData(sign);

  if (obj.dateShortString === todayShortString) {
    return false;
  }
  console.log("TODAY DATE IS NOT IN THE DATA!");
  return true;
}

export async function getTodayRecordFromDB(sign: string): Promise<string> {
  // TODO: if nobody asked today already for sign's data
  // check by shortDateString
  const todayDataObject = await GetLastElementJSNatFromSignData(sign);
  return todayDataObject.text;
}

/**
 * Function creates new document with the daily sign information
 * The new document' name is today's date in format: "ddMMyyyy"
 * @param sign
 * @param tableId
 * @param text
 */
export async function addSignDailyInfoIntoDB(
  sign: string,
  createdAt: string,
  text: string
): Promise<void> {
  try {
    const db = database.firestore();
    const signDataRef = db.collection("signs_ZodiacDirBG").doc(sign);
    const doc = await signDataRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      const currArrayData = await GetArrayJSNatFromSignData(sign);
      const updatedArrayData = await AppendToArrayTodayElement(currArrayData, {
        createdAt: createdAt,
        text: text,
      });
      signDataRef.set({ data: updatedArrayData });
    }

    // //******************** TODO: Refactoring
    // // Atomically add a new region to the "regions" array field.
    // const addElement = await signDataRef.update({
    //   data: firestore.FieldValue.arrayUnion({ createdAt, text }),
    // });
    // //********************
  } catch (err) {
    console.log(err);
  }
}

export async function allSignsInformationDocumentAbsent(): Promise<boolean> {
  const query = database.firestore();
  const cityRef = query
    .collection("allSignsInfo")
    .doc("allSignsInfoInOneString");
  const doc = await cityRef.get();
  if (!doc.exists) {
    return true;
  } else {
    return false;
  }
}
