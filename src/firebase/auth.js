import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getDoc,
  getDocs,
  addDoc,
  collection,
  // onSnapshot,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { validateRegisterData } from "./helpers";

import { auth, db } from "./configuration";

import store from "../store";
import router from "../router";

const getAndSetUser = async ({ uid }) => {
  const getUserQuery = query(collection(db, "Users"), where("uid", "==", uid));

  const userQuerySnapshot = await getDocs(getUserQuery);
  await store.dispatch("setUserDocumentSnapshot", userQuerySnapshot.docs[0]);
  // const unsubscribe = onSnapshot(getUserQuery, async (querySnapshot) => {
  //   const docChanges = querySnapshot.docChanges();
  //   for (let i = 0; i < docChanges.length; i++) {
  //     const change = docChanges[i];
  //     if (change.doc.exists) {
  //       const document = change.doc;
  //       console.log({ document: document.data() });
  //       await store.dispatch("setUserDocumentSnapshot", document);
  //       console.log({ doc: store.getters.getUserDocumentSnapshot.data() });
  //     }
  //   }
  // });
  // console.log({ unsubscribe });
  // return store.dispatch("setUserDocumentSnapshotUnsubscribe", unsubscribe);
};

/*const unsetUser = async () => {
  store.getters.getUserDocumentSnapshotUnsubscribe();
  return store.dispatch("setUserDocumentSnapshot", null);
};*/

/**
 * This is the function that is used to register a user to the application.
 * @param {object} payload - This is the payload object of the function.
 * @property {string} payload.email - This is the email of the user.
 * @property {string} payload.password - This is the password of the user.
 * @property {string} payload.name - This is the name of the  user.
 * @property {surname} payload.surname - This is the surname of the user.
 * @property {string} payload.phoneNumber - This is the phoneNumber of the user.
 * @property {string} payload.dateOfBirth - This is the dateOfBirth of the user.
 * @property {string} payload.title - This is the title of the user.
 * @returns {DocumentReference<import('firebase/firestore').DocumentData}
 * Returns the document reference of the  newly added user document
 */
const register = async ({
  password,
  email,
  name,
  surname,
  phoneNumber,
  registration,
  type,
}) => {
  const { status, message } = validateRegisterData({
    name,
    surname,
    phoneNumber,
  });
  if (!status) throw new Error(message);

  console.log({ status });

  console.log({ auth, email, password });
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  console.log({ user });

  updateProfile(user, {
    displayName: `${name.slice(0, 1).toUpperCase()}${name
      .slice(1)
      .toLowerCase()} ${surname.slice(0, 1).toUpperCase()}${surname
      .slice(1)
      .toLowerCase()} ${type.slice(0, 1).toUpperCase()}${type.slice(1)}`,
  });
  const userObject = {
    name: name.toLowerCase(),
    surname: surname.toLowerCase(),
    email: email.toLowerCase(),
    phoneNumber: phoneNumber,
    uid: user.uid,
    type: type.toLowerCase(),
    date: serverTimestamp(),
  };

  if (type === "taxi") userObject.registration = registration;

  const userDocumentSnapshotReference = await addDoc(
    collection(db, "Users"),
    userObject
  );

  const userDocumentSnapshot = await getDoc(userDocumentSnapshotReference);

  await store.dispatch("setUserCredential", { UserCredential: user });
  await store.dispatch("setUserDocumentSnapshot", userDocumentSnapshot);
  if (type === "passenger") {
    router.push("/passenger");
  }
  if (type === "tax") {
    router.push("/tax");
  }
};

/**
 * @param {payload} param
 * @property {string} param.email - This is the email of the user.
 * @property {string} param.password - This is the password of the user.
 * @returns {UserCredential} - Returns the user credential of the user
 */
const login = async ({ email, password }) => {
  console.log({ email, password });
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * This is the function used to log the user out of the application
 * @returns {Promise<void>} - Returns a promise that resolves to void
 */
const logout = async () => {
  await signOut(auth);
};

const authStateChanged = async () => {
  const onAuthStateChangedUnsubscribe = onAuthStateChanged(
    auth,
    async (user) => {
      if (user) {
        console.log({ user });
        await getAndSetUser({ uid: user.uid });
        await store.dispatch("setUserCredential", user);
        if (
          router.currentRoute.path === "/" ||
          router.currentRoute.path === "/password-page" ||
          router.currentRoute.path === "/registration"
        ) {
          const userDocumentSnapshot = store.getters.getUserDocumentSnapshot;
          console.log({ userDocumentSnapshot });
          if (userDocumentSnapshot.data().type == "passenger")
            router.push("/passenger");
          else if (userDocumentSnapshot.data().type == "taxi") {
            console.log("going to taxi dashboard");
            router.push("/taxi");
          }
        }
      } else {
        if (store.getters.getOnAuthStateChangedUnsubscribe)
          store.getters.getOnAuthStateChangedUnsubscribe();
        await store.dispatch("setUserCredential", null);
        if (router.currentRoute.path !== "/") {
          router.push("/");
        }
      }
    },
    (error) => console.error(error)
  );
  await store.dispatch("setOnAuthStateChanged", onAuthStateChangedUnsubscribe);
};

export { register, login, logout, authStateChanged };
