import { database } from "../libs/database";

/**
 * Function creates new document with the daily sign information
 * The new document' name is today's date in format: "ddMMyyyy"
 * @param sign
 * @param tableId
 * @param text
 */
export async function addSignDailyInfoIntoDB(
  sign: string,
  tableId: string,
  text: string
): Promise<void> {
  const query = database.firestore();
  query.collection(sign).doc(tableId).set({ text: text });
}

/**
 * Function appends the daily sign information to the existing text in the document "AllSignsInfoInOneString"
 * @param text: daily sign information
 */
export async function mergeSignDailyInfoIntoAllSignsInformation(
  text: string
): Promise<void> {
  const query = database.firestore();
  query
    .collection("allSignsInfo")
    .doc("allSignsInfoInOneString")
    .set({ text: true }, { merge: text });
}

/**
 * Function creates document for all signs information
 */
export async function createSignDailyInfoIntoAllSignsInformation(): Promise<void> {
  const query = database.firestore();
  query
    .collection("allSignsInfo")
    .doc("allSignsInfoInOneString")
    .set({ text: "" });
}
