import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../configuration";
import store from "../../store";
import axios from "axios";

const addRide = async ({ origin, destination, uid }) => {
  console.log("Destination unchecked now, come fix");
  console.log({ destination });
  if (destination == "") throw new Error("Destination not selected");
  if (origin == null) throw new Error("Origin not selected");
  if (uid == null) throw new Error("User Identity not present");
  console.log("Hey");
  const configDestination = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${destination.lat},${destination.lng}&key=AIzaSyB1oFD8l6nVod4FU4XuFxxlbDw2uxhTUf0`,
    headers: {},
  };
  const configOrigin = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${origin.lat},${origin.lng}&key=AIzaSyB1oFD8l6nVod4FU4XuFxxlbDw2uxhTUf0`,
    headers: {},
  };
  const destinationResponse = await axios(configDestination);
  const originResponse = await axios(configOrigin);
  console.log({ destinationResponse, originResponse });

  const documentReference = await addDoc(collection(db, "Rides"), {
    date: serverTimestamp(),
    origin,
    destination,
    destinationName: destinationResponse.data.results[0].formatted_address,
    originName: originResponse.data.results[0].formatted_address,
    uid,
    bids: [],
    status: "open",
    ...store.getters.getUserDocumentSnapshot.data(),
  });
  return store.dispatch(
    "setPassengerRideUnsubscribe",
    onSnapshot(documentReference, (doc) => {
      store.dispatch("setPassengerRide", doc.data()).then(() => {
        store.dispatch("setPassengerRidePath", doc.ref.path);
      });
      console.log("Current data: ", doc.data());
    })
  );
};

export { addRide };
