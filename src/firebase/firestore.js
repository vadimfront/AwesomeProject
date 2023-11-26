import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./config";

export const writeDataToFirestore = async (dbName, data) => {
  try {
    const docRef = await addDoc(collection(db, dbName), data);

    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const replaceDataInFirestore = async (
  collectionName,
  fieldName,
  value,
  data
) => {
  try {
    if (!data) throw new Error("Data is missing");
    const q = query(
      collection(db, collectionName),
      where(fieldName, "==", value)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.size) throw new Error("User document not found");
    const currentDoc = querySnapshot.docs[0];
    const docRef = doc(db, collectionName, currentDoc.id);
    if (!docRef) throw new Error("Error! User not exist");
    await updateDoc(docRef, data);
  } catch (error) {
    throw error;
  }
};

export const updateDataInFirestore = async (
  collectionName,
  fieldName,
  updateAt,
  equalValue,
  value
) => {
  try {
    if (!value) throw new Error("Data is missing");
    console.log(collectionName, fieldName, updateAt, equalValue, value);
    const q = query(
      collection(db, collectionName),
      where(fieldName, "==", equalValue)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.size) throw new Error("User document not found");
    const currentDoc = querySnapshot.docs[0];
    const docRef = doc(db, collectionName, currentDoc.id);
    if (!docRef) throw new Error("Error! User not exist");
    await updateDoc(docRef, {
      [updateAt]: [...value],
    });
  } catch (error) {
    throw error;
  }
};

export const fetchSingleFirestore = async (
  collectionName,
  fieldName,
  value
) => {
  try {
    const q = query(
      collection(db, collectionName),
      where(fieldName, "==", value)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.size) return;

    return querySnapshot.docs[0].data();
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const fetchAllDataFirestore = async (collectionName, dataLimit = 2) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy("date", "desc"), limit(dataLimit));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.size) return;

    const allPosts = querySnapshot.docs.map((doc) => doc.data());
    return allPosts;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const subscribeToFirestoreCollection = (
  collectionName,
  callback,
  //dataLimit = 12,
  { fieldName, value }
) => {
  const collectionRef = collection(db, collectionName);
  const q = query(
    collectionRef,
    fieldName && value && where(fieldName, "==", value),
    orderBy("date", "desc")
    // limit(dataLimit)
  );

  return onSnapshot(q, (querySnapshot) => {
    const updatedPosts = [];

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        updatedPosts.push(doc.data());
      }
    });
    callback(updatedPosts);
  });
};

rules_version = "2";
