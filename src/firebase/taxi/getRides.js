import { collection, getDocs, query, where } from "firebase/firestore";
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
};
export { getRides };
