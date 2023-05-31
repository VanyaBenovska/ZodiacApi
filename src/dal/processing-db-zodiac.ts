// import { database } from "../libs/database";

// export async function recordAbsent(
//   sign: string,
//   recordName: string
// ): Promise<boolean> {
//   const query = database.firestore(); // const db = getFirestore();
//   const docRef = query.collection(sign).doc(recordName);
//   const doc = await docRef.get();
//   if (!doc.exists) {
//     return true; // No such document!
//   } else {
//     return false; // Document present
//   }
// }

// export async function allSignsInformationDocumentAbsent(): Promise<boolean> {
//   const query = database.firestore(); // const db = getFirestore();
//   const cityRef = query
//     .collection("allSignsInfo")
//     .doc("allSignsInfoInOneString");
//   const doc = await cityRef.get();
//   if (!doc.exists) {
//     return true; // No such document!
//   } else {
//     return false; // Document present
//   }
// }

// export async function getTextByDocumentName(
//   sign: string,
//   documentName: string
// ): Promise<string> {
//   let doc = {};
//   try {
//     const signDocsRef = database.collection(sign).doc(documentName);
//     doc = await signDocsRef.get();
//   } catch (err) {
//     console.log(err);
//   }
//   // todo!!
//   return doc.toString();
// }

// export async function getRandomTextFromExistingDocumentsOfSign(
//   sign: string
// ): Promise<string> {
//   const signDocsRef = database.firestore().collection(sign); // const db = getFirestore();

//   const snapshot = await signDocsRef.get();
//   //const snapshot2 = await signDocsRef.

//   // snapshot.forEach(docu => {
//   //   console.log(document.id, '=>', document.data());
//   // });
//   return "";
// }
