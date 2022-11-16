import { register, login, logout, authStateChanged } from "./auth";
import { auth, db } from "./configuration";
import { addRide, getPassengerRide } from "./passengers";
import { addBidToRide } from "./taxi/addBidToRide";
import { checkIfUserExists } from "./users/checkIfUserExists";
import { getRides } from "./taxi/getRides";
import { bidRide } from "./taxi/bidRide";
import { cancelRide } from "./cancelRide";
import { payRide } from "./payRide";

import { regex } from "./helpers";

export {
  addBidToRide,
  getRides,
  register,
  login,
  logout,
  authStateChanged,
  auth,
  db,
  regex,
  checkIfUserExists,
  addRide,
  bidRide,
  getPassengerRide,
  cancelRide,
  payRide,
};
