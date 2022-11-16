<template>
  <v-layout column class="mt-6">
    <h1 class="text-center font-weight-regular text-h4">Pay For Ride</h1>
    <v-divider class="mb-5" />
    <v-text-field
      rounded
      outlined
      label="MOMO PIN"
      type="password"
      v-model="pin"
    ></v-text-field>
    <v-btn rounded @click="payRide()">Pay</v-btn>
    <v-btn rounded class="mt-3 green" @click="$router.go(-1)">Taxi</v-btn>
  </v-layout>
</template>

<script>
import { payRide } from "../firebase";
export default {
  name: "PayTaxiComponent",
  data: () => ({
    pin: "",
  }),
  methods: {
    payRide() {
      if (this.pin == "") return;
      console.log("paying");
      console.log({ path: this.passengerRidePath });
      payRide({ path: this.passengerRidePath }).then(() => {
        console.log("paid");
        this.$router.push("/passenger/wait-for-taxi");
      });
    },
  },
  computed: {
    passengerRidePath() {
      return this.$store.getters.getPassengerRidePath;
    },
  },
};
</script>
