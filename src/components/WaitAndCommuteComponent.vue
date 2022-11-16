<template>
  <v-layout class="mt-6" column>
    <v-layout column>
      <h1 class="text-h3 text-center font-weight-regular mb-5">
        Taxi On The Way..
      </h1>
      <h1 class="text-h5 text-center font-weight-regular">
        {{ timeleft }} away
      </h1>
    </v-layout>
    <v-btn
      rounded
      outlined
      class="mt-4 font-weight-bold"
      color="blue lighten-2"
      @click="cancel()"
      >Cancel Ride</v-btn
    >
    <v-btn
      rounded
      outlined
      class="mt-4 font-weight-bold"
      color="green lighten-2"
      @click="$router.push('/passenger')"
      >Complete Ride</v-btn
    >
  </v-layout>
</template>
<script>
import { cancelRide } from "../firebase";
export default {
  name: "WaitForTaxiComponent",
  computed: {
    timeleft() {
      return "30 minutes";
      //return this.$store.getters.getTimeLeftForTaxiToArive;
    },
  },
  methods: {
    cancel() {
      console.log("In Component");
      cancelRide().then(() => {
        this.$router.push("/passenger");
      });
    },
  },
};
</script>
