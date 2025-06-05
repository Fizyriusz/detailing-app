import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const clientsCol = collection(db, "clients");

export const addClient = async (client) => {
  return addDoc(clientsCol, client);
};

export const getClients = async () => {
  const snapshot = await getDocs(clientsCol);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateClient = async (id, data) => {
  const ref = doc(db, "clients", id);
  return updateDoc(ref, data);
};

export const deleteClient = async (id) => {
  const ref = doc(db, "clients", id);
  return deleteDoc(ref);
};
