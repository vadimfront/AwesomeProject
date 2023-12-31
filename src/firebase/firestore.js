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
  startAfter,
  writeBatch,
} from "firebase/firestore";
import { db } from "./config";
import { DATA_LIMIT } from "../constants/constants";

export const writeDataToFirestore = async (dbName, data) => {
  try {
    const docRef = await addDoc(collection(db, dbName), data);

    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
export const replaceDataInFirestore = async ({
  collectionName,
  fieldName,
  value,
  data,
}) => {
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
    console.log(error);
    throw error;
  }
};

export const updateDataInFirestore = async ({
  collectionName,
  fieldName,
  updateAt,
  equalValue,
  value,
}) => {
  try {
    if (!value) throw new Error("Data is missing");

    const batch = writeBatch(db);

    const q = query(
      collection(db, collectionName),
      equalValue && where(fieldName, "==", equalValue)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No documents found");
    }

    querySnapshot.forEach((docSnapshot) => {
      const docRef = doc(db, collectionName, docSnapshot.id);

      batch.update(docRef, { [updateAt]: value });
    });

    await batch.commit();
  } catch (error) {
    throw error;
  }
};

export const fetchSingleFirestore = async ({
  collectionName,
  fieldName,
  equalValue,
}) => {
  try {
    const whereProps =
      fieldName && equalValue ? [where(fieldName, "==", equalValue)] : [];

    const q = query(collection(db, collectionName), ...whereProps);
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.size) return;

    return querySnapshot.docs.map((doc) => doc.data());
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const fetchData = async ({
  collectionName,
  type,
  fieldName,
  equalToFieldName,
}) => {
  try {
    const collectionRef = collection(db, collectionName);

    const whereProps =
      fieldName && equalToFieldName
        ? [where(fieldName, "==", equalToFieldName)]
        : [];
    const q = query(
      collectionRef,
      orderBy("date", "desc"),
      limit(DATA_LIMIT),
      ...whereProps
    );
    const documentSnapshots = await getDocs(q);
    if (documentSnapshots.empty) {
      return {
        documents: [],
        lastVisible: null,
        type: type,
      };
    }
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1].data().date;

    return {
      documents: documentSnapshots.docs.map((doc) => doc.data()),
      lastVisible: lastVisible,
      type: type,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchMoreData = async ({
  collectionName,
  type,
  fieldName,
  equalToFieldName,
  lastVisible,
}) => {
  try {
    const collectionRef = collection(db, collectionName);
    const whereProps =
      fieldName && equalToFieldName
        ? [where(fieldName, "==", equalToFieldName)]
        : [];
    const q = query(
      collectionRef,
      orderBy("date", "desc"),
      startAfter(lastVisible),
      limit(DATA_LIMIT),
      ...whereProps
    );
    const documentSnapshots = await getDocs(q);

    if (!documentSnapshots.size) {
      return {
        documents: [],
        isLastPost: true,
        lastVisible: null,
        type: type,
      };
    }

    const data = {
      documents: documentSnapshots.docs.map((doc) => doc.data()),
      lastVisible:
        documentSnapshots.docs[documentSnapshots.docs.length - 1].data().date,
      isLastPost: false,
      type: type,
    };
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllDataFirestore = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);
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
