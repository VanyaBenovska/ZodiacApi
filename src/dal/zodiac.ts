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

export async function recordAbsent(
  sign: string,
  recordName: string
): Promise<boolean> {
  const query = database.firestore();
  const docRef = query.collection(sign).doc(recordName);
  const doc = await docRef.get();
  if (!doc.exists) {
    return true;
  } else {
    return false;
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

export async function getTextByDocumentName(
  sign: string,
  documentName: string
): Promise<string> {
  let doc = {};
  try {
    const signDocsRef = database.collection(sign).doc(documentName);
    doc = await signDocsRef.get();
  } catch (err) {
    console.log(err);
  }
  // TODO
  return doc.toString();
}

export async function getRandomTextFromExistingDocumentsOfSign(
  sign: string
): Promise<string> {
  const signDocsRef = database.firestore().collection(sign);

  const snapshot = await signDocsRef.get();
  // TODO
  return "";
}
