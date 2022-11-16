<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" class="d-flex flex-column justify-center align-center">
        <h1
          v-if="bids.length == 0"
          class="text-center text-display font-weight-regular mr-2"
        >
          Searching For Taxi
        </h1>
        <v-progress-linear
          indeterminate
          color="green"
          v-if="bids.length == 0"
        ></v-progress-linear>
        <v-btn
          v-if="bids.length == 0"
          dark
          rounded
          class="blue lighten-2 text-h5 mt-6"
          @click="cancel()"
          >Cancel Ride</v-btn
        >
        <h1 v-else class="text-center text-display font-weight-regular mr-2">
          Available Bids
        </h1>
        <v-divider class="mb-3" />
      </v-col>
      <v-col>
        <v-virtual-scroll
          v-if="bids.length != 0"
          :items="bids"
          item-height="70"
          width="400px"
          max-height="calc(55vh - 105px)"
        >
          <template v-slot:default="{ item, index }">
            <v-list-item :key="index" link @click="viewTaxi(item)">
              <v-list-item-avatar>
                <v-avatar dense v-bind="attrs" v-on="on" color="white"
                  >{{ item.name[0].toUpperCase()
                  }}{{ item.surname[0].toUpperCase() }}</v-avatar
                >
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  >{{ item.name }} {{ item.surname }}</v-list-item-title
                >
                <v-list-item-title>{{ item.registration }}</v-list-item-title>
                <v-list-item-subtitle>E {{ item.price }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { cancelRide } from "../firebase";
export default {
  name: "TaxisComponent",
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    taxis() {
      return this.$store.getters.getAvailableTaxis;
    },
    bids() {
      return this.$store.getters.getPassengerRideBids;
    },
  },
  methods: {
    cancel() {
      console.log("In Cancel");
      cancelRide().then(() => {
        this.$router.push("/passenger");
      });
    },
    async viewTaxi(taxi) {
      console.log({ taxi });
      await this.$store.dispatch("setSelectedTaxi", taxi);
      this.$router.push("/passenger/view-taxi");
    },
  },
};
</script>
