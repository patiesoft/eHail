import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../configuration";
import store from "../../store";

const getRides = async () => {
  console.log("GET_RIDES");
  const getRidesQuery = query(
    collection(db, "Rides"),
    where("status", "==", "open")
  );
  const querySnapshot = await getDocs(getRidesQuery);
  console.log(querySnapshot.docs);
  store.dispatch("setAvailableRides", querySnapshot.docs);

  // const unsubscribe = onSnapshot(getRidesQuery, (querySnapshot1) => {
  //   querySnapshot1.forEach((doc) => {
  //     store.dispatch("setAvailableRides", doc.data());
  //   });
  // });
};
export { getRides };
