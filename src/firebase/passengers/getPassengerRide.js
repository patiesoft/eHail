import { collection, onSnapshot, query, where } from "firebase/firestore";
import store from "../../store";
import router from "../../router";
import { db } from "../configuration";

const getPassengerRide = async () => {
  console.log("Looking if there are pending rides for the Passenger");
  const rideQuery = query(
    collection(db, "Rides"),
    where("uid", "==", store.getters.getUID),
    where("status", "==", "open")
  );

  return store.dispatch(
    "setPassengerRideUnsubscribe",
    onSnapshot(rideQuery, (querySnapshot) => {
      if (!querySnapshot.empty && router.currentRoute.path !== "/taxi") {
        console.log("FIRERIIIIIING");
        store
          .dispatch("setPassengerRide", querySnapshot.docs[0].data())
          .then(() => {
            store.dispatch(
              "setPassengerRidePath",
              querySnapshot.docs[0].ref.path
            );
          });
        router.push("/passenger/select-taxi");
      }
    })
  );
};

export { getPassengerRide };
