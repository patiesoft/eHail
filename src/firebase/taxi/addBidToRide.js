import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../configuration";
import store from "../../store";

const addBidToRide = async ({ price, path, uid }) => {
  if (price == null) throw new Error("Origin not selected");
  if (path == null) throw new Error("Origin not selected");
  if (uid == null) throw new Error("User Identity not present");
  await addDoc(collection(db, path), {
    price,
    uid,
    ...store.getters.getUserDocumentSnapshot.data(),
    date: serverTimestamp(),
  });
};

export { addBidToRide };
