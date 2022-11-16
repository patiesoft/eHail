import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: null,
    selectedTaxi: null,
    userDocumentSnapshot: null,
    userCredential: null,
    userDocumentSnapshotUnsubscribe: null,
    onAuthStateChangedUnsubscribe: null,
    passengerRideUnsubscribe: null,
    origin: null,
    destination: null,
    destinationName: "",
    rides: [],
    passengerRidePath: "",
    // passengerRide: {
    //   bids: [],
    //   date: "",
    //   origin: "",
    //   destination: "",
    //   uid: "",
    //   status: "",
    //   name: "",
    //   surname: "",
    // },
    passengerRide: null,
  },
  getters: {
    getPassengerRideBids: (state, getters) =>
      getters.getPassengerRide == null ? [] : getters.getPassengerRide.bids,
    getPassengerRide: (state) => state.passengerRide,
    getPassengerRidePath: (state) => state.passengerRidePath,
    getAvailableRides: (state) => state.rides,
    getUserCredential: (state) => state.userCredential,
    getUID: (state, getters) => getters.getUserCredential.uid || "",
    getOrigin: (state) => state.origin,
    getDestination: (state) => state.destination,
    getDestinationName: (state) => state.destinationName,
    getOnAuthStateChangedUnsubscribe: (state) =>
      state.onAuthStateChangedUnsubscribe,
    getUserDocumentSnapshotUnsubscribe: (state) =>
      state.userDocumentSnapshotUnsubscribe,
    getPassengerRideUnsubscribe: (state) => state.passengerRideUnsubscribe,
    getUserDocumentSnapshot: (state) => state.userDocumentSnapshot,
    getUserInitials: (state, getters) =>
      `${getters.getUserDocumentSnapshot
        .data()
        .name[0].toUpperCase()}${getters.getUserDocumentSnapshot
        .data()
        .surname[0].toUpperCase()}`,
    getSelectedTaxi(state) {
      return state.selectedTaxi;
    },
    getTimeLeftForTaxiToArive: () => 10,
    getSetEmail: (state) => state.email,
    getAvailableTaxis() {
      const taxis = [];
      const colors = ["black", "white", "grey", "red", "green"];
      const names = ["Asambe", "Hamba", "Left", "Leave", "Vacate"];
      const firstnames = [
        "Phathizwe",
        "Siphiwo",
        "Msawenkosi",
        "Nkosinathi",
        "Walter",
      ];
      const cars = ["Toyota", "Honda", "Nissan", "Mazda", "Colt"];
      const lastnames = [
        "Vilakazi",
        "Shongwe",
        "Masina",
        "Matsebula",
        "Siboza",
      ];
      const images = [
        "https://images.unsplash.com/photo-1490650404312-a2175773bbf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGF4aXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://media.istockphoto.com/photos/taxi-billboard-in-times-square-picture-id151536291?b=1&k=20&m=151536291&s=170667a&w=0&h=7BbJAj7Zh3FXOwyTNxi72pEeN0IHwO4AsWOzy-zuw6U=",
        "https://images.unsplash.com/photo-1628947733273-cdae71c9bfd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRheGl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      ];
      for (let i = 0; i < 100; i++) {
        const price = Math.floor(Math.random() * (200 - 50) + 50);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const name = names[Math.floor(Math.random() * names.length)];
        const driver = {
          name: firstnames[Math.floor(Math.random() * firstnames.length)],
          surname: lastnames[Math.floor(Math.random() * lastnames.length)],
          age: Math.floor(Math.random() * (60 - 18) + 18),
        };
        const vehicle = {
          name: cars[Math.floor(Math.random() * cars.length)],
          model: "Sedan",
          year: Math.floor(Math.random() * (2022 - 1990) + 1990),
        };
        const coordinates = {
          lat: parseFloat(
            Math.floor(Math.random() * (90 + 90) - 90).toFixed(4)
          ),
          lng: parseFloat(
            Math.floor(Math.random() * (180 + 180) - 180).toFixed(4)
          ),
        };
        taxis.push({
          name,
          price,
          coordinates,
          color,
          images,
          driver,
          vehicle,
          rating: Math.floor(Math.random() * (5 - 1) + 1),
        });
      }
      return taxis;
    },
  },
  mutations: {
    SET_PASSENGER_RIDE_PATH(state, passengerRidePath) {
      state.passengerRidePath = passengerRidePath;
    },
    SET_PASSENGER_RIDE(state, passengerRide) {
      state.passengerRide = passengerRide;
    },
    SET_ORIGIN(state, origin) {
      state.origin = origin;
    },
    SET_DESTINATION(state, destination) {
      state.destination = destination;
    },
    SET_DESTINATION_NAME(state, name) {
      state.destinationName = name;
    },
    SET_SELECTED_TAXI(state, taxi) {
      state.selectedTaxi = taxi;
    },
    SET_USER_DOCUMENT_SNAPSHOT(state, user) {
      state.userDocumentSnapshot = user;
    },
    SET_USER_DOCUMENT_SNAPSHOT_UNSUBSCRIBE(state, unsubscribe) {
      state.userDocumentSnapshotUnsubscribe = unsubscribe;
    },
    SET_USER_CREDENTIAL(state, userCredential) {
      state.userCredential = userCredential;
    },
    SET_ON_AUTH_STATE_CHANGED_UNSUBSCRIBE(
      state,
      onAuthStateChangedUnsubscribe
    ) {
      state.onAuthStateChangedUnsubscribe = onAuthStateChangedUnsubscribe;
    },
    SET_EMAIL(state, email) {
      state.email = email;
    },
    SET_AVAILABLE_RIDES(state, rides) {
      state.rides = rides;
    },
    SET_PASSENGER_RIDE_UNSUBSCRIBE(state, unsubscribe) {
      state.passengerRideUnsubscribe = unsubscribe;
    },
  },
  actions: {
    setPassengerRide({ commit }, passengerRide) {
      return commit("SET_PASSENGER_RIDE", passengerRide);
    },
    setPassengerRidePath({ commit }, passengerRidePath) {
      return commit("SET_PASSENGER_RIDE_PATH", passengerRidePath);
    },
    setOnAuthStateChanged({ commit, onAuthStateChangedUnsubscribe }) {
      return commit(
        "SET_ON_AUTH_STATE_CHANGED_UNSUBSCRIBE",
        onAuthStateChangedUnsubscribe
      );
    },
    setOrigin({ commit }, origin) {
      return commit("SET_ORIGIN", origin);
    },
    setDestination({ commit }, destination) {
      return commit("SET_DESTINATION", destination);
    },
    async setDestinationName({ commit }, name) {
      return commit("SET_DESTINATION_NAME", name);
    },
    setSelectedTaxi({ commit }, taxi) {
      return commit("SET_SELECTED_TAXI", taxi);
    },
    setUserDocumentSnapshot({ commit }, user) {
      commit("SET_USER_DOCUMENT_SNAPSHOT", user);
    },
    setUserDocumentSnapshotUnsubscribe({ commit }, user) {
      commit("SET_USER_DOCUMENT_SNAPSHOT_UNSUBSCRIBE", user);
    },
    setUserCredential({ commit }, userCredential) {
      commit("SET_USER_CREDENTIAL", userCredential);
    },
    setEmail({ commit }, email) {
      commit("SET_EMAIL", email);
    },
    setAvailableRides({ commit }, rides) {
      commit("SET_AVAILABLE_RIDES", rides);
    },
    setPassengerRideUnsubscribe({ commit }, unsubscribe) {
      commit("SET_PASSENGER_RIDE_UNSUBSCRIBE", unsubscribe);
    },
  },
  modules: {},
});
