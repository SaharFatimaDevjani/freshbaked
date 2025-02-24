// here replace everything as per need


import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

// Function to add a document to any collection
export const addDocument = async (collectionName, data) => {
  await addDoc(collection(db, collectionName), data);
};

// Function to get all documents from any collection
export const getDocuments = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to delete a document by ID
export const deleteDocument = async (collectionName, docId) => {
  await deleteDoc(doc(db, collectionName, docId));
};

export default db;
