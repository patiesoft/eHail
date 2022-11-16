import { db } from "./configuration";
import {
  updateDoc,
  doc,
  // getDoc,
  query,
  collection,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";
import store from "../store";
const payRide = async ({ path }) => {
  console.log("Paying Ride");
  const documentRef = doc(db, path);
  const selectedTaxi = store.getters.getSelectedTaxi;
  const taxiQuery = query(
    collection(db, "Users"),
    where("uid", "==", selectedTaxi.uid)
  );
  console.log("Paying Ride2");
  const taxiQuerySnapshot = await getDocs(taxiQuery);
  console.log("Paying Ride3");
  const taxiDocumentSnapshot = taxiQuerySnapshot.docs[0];
  console.log("Paying Ride4");
  const collectionPath = taxiDocumentSnapshot.ref.path + "/Bookings";
  console.log("Paying Ride5");
  console.log({ collectionPath });
  console.log("Paying Ride6");
  console.log(store.getters.getUserDocumentSnapshot.data());
  console.log("Paying Ride7");
  await addDoc(collection(db, collectionPath), {
    ...store.getters.getUserDocumentSnapshot.data(),
  });
  console.log("Paying Ride8");
  await updateDoc(documentRef, {
    status: "paid-waiting",
    selectedTaxi,
  });
};

export { payRide };
