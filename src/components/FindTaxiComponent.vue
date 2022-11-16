<template>
  <v-layout align-center column justify-center class="search-taxis mt-7">
    <h5 class="mb-2 font-weight-regular" v-if="destination != ''">
      Selected Destination:
    </h5>
    <h5 class="mb-2 font-weight-regular" v-else>
      Drag icon to select destination
    </h5>
    <v-flex>
      <h4 class="mb-4 text-display font-weight-regular">{{ destination }}</h4>
    </v-flex>
    <v-btn
      rounded
      outlined
      @click="searchTaxis"
      color="blue darken-2"
      class="font-weight-bold"
      >Find Taxi</v-btn
    >
  </v-layout>
</template>
<script>
import { addRide, getPassengerRide } from "../firebase";
export default {
  name: "SearchTaxiComponent",
  data() {
    return {};
  },
  computed: {
    origin() {
      return this.$store.getters.getOrigin;
    },
    destination() {
      return this.$store.getters.getDestinationName;
    },
  },
  methods: {
    searchTaxis() {
      addRide({
        origin: this.origin,
        destination: this.$store.getters.getDestination,
        uid: this.$store.getters.getUID,
      })
        .then(() => {
          this.$router.push("/passenger/select-taxi");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.log("In Mounted");
    getPassengerRide()
      .then(() => {
        console.log("rides checked");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style>
search-taxis {
  min-height: 10vh;
}
</style>
