import { db } from "./configuration";
import { doc, updateDoc } from "firebase/firestore";
import store from "../store";
const cancelRide = async () => {
  console.log("CancelRide");
  const path = store.getters.getPassengerRidePath;
  const documentRef = doc(db, path);
  await updateDoc(documentRef, {
    status: "cancelled",
  });
};

export { cancelRide };
