<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { authStateChanged } from "./firebase/auth.js";
export default {
  name: "App",

  data: () => ({
    //
  }),
  mounted() {
    console.log("hey");
    authStateChanged();
    console.log("hey");
  },
  beforeDestroy() {
    console.log("In BeforeDestroy");
    this.getOnAuthStateChangedUnsubscribe();
    this.getUserDocumentSnapshotUnsubscribe();
    this.getPassengerRideUnsubscribe();
    console.log("Leaving BeforeDestroy");
  },
};
</script>
