import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../configuration";
import store from "../../store";

const checkIfUserExists = async (email) => {
  const passengerCollectionReference = collection(db, "Users");
  const passengerQuerySnapshot = await getDocs(
    query(passengerCollectionReference, where("email", "==", email))
  );

  console.log({ email });
  console.log(passengerQuerySnapshot.docs);
  if (passengerQuerySnapshot.empty) return false;
  store.dispatch("setEmail", email);
  return true;
};

export { checkIfUserExists };
