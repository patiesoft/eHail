import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../configuration";

const bidRide = async ({ path, price, name, surname, uid, registration }) => {
  console.log({
    path,
    price,
    uid,
    name,
    surname,
    registration,
  });
  console.log("bidRide");
  const documentReference = doc(db, path);
  return await updateDoc(documentReference, {
    bids: arrayUnion({
      uid,
      name,
      surname,
      price,
      registration,
    }),
  });
};
export { bidRide };
