import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

console.log(process.env);
// const app = initializeApp({
//   apiKey: process.env.VUE_APP_API_KEY,
//   authDomain: process.env.VUE_APP_AUTH_DOMAIN,
//   projectId: process.env.VUE_APP_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_APP_ID,
// });
const app = initializeApp({
  apiKey: "AIzaSyBU5FYXUO0b5AgcwuZTZmDPfCOIlnhkpdY",
  authDomain: "testing-af16b.firebaseapp.com",
  projectId: "testing-af16b",
  storageBucket: "testing-af16b.appspot.com",
  messagingSenderId: "867205266048",
  appId: "1:867205266048:web:82c4285d203ffc78450465",
});

const auth = getAuth(app);
const db = getFirestore(app);

const connectEmulators = true;
if (connectEmulators === true) {
  connectFirestoreEmulator(db, "localhost", "8092");
  connectAuthEmulator(auth, "http://localhost:9099");
  console.log("Emulators Connected!");
}

export { auth, db };

// This application only uses one firebase project.  Do not really need to make
// and export the app object
