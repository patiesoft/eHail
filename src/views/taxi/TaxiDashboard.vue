<template>
  <v-container fluid class="app-width">
    <v-app-bar app color="grey lighten-2" elevate-on-scroll height="70px">
      <v-icon v-show="$router.currentRoute.path !== '/taxi'"
        >mdi-arrow-left</v-icon
      >
      <v-flex>
        <v-toolbar-title class="text-h5 ml-2 font-weight-bold"
          >e'Hail</v-toolbar-title
        >
      </v-flex>

      <v-spacer></v-spacer>
      <v-chip elevation="1" class="text-h6 font-weight-regular gry lighten-1"
        >Taxi</v-chip
      >
      <v-spacer></v-spacer>

      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar dense v-bind="attrs" v-on="on" color="white">{{
            initials
          }}</v-avatar>
        </template>
        <v-list>
          <v-list-item :to="{ name: 'userprofile' }">
            <v-list-item-title> Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="signout">
            <v-list-item-title> logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-layout column>
      <v-container fluid>
        <v-row justify="center">
          <GmapMap
            :center="myCoordinates"
            :zoom="20"
            map-type-id="terrain"
            :style="mapStyle"
          >
            <GmapMarker
              :position="myCoordinates"
              :clickable="false"
              :draggable="false"
            />
          </GmapMap>
        </v-row>
      </v-container>
    </v-layout>
    <!--<v-layout column>
      <h2 class="text-center">Booking</h2>
      <h2 class="text-center text-display font-weight-regular">
        origin: ${{}}
      </h2>
      <h2 class="text-center text-display font-weight-regular">
        destination: ${{}}
      </h2>
      <h2 class="text-center text-display font-weight-regular">name: ${{}}</h2>
      <h2 class="text-center text-display font-weight-regular">
        surname: ${{}}
      </h2>
    </v-layout>-->
    <v-layout column>
      <v-divider />
      <h2 class="text-center">Available Passengers</h2>

      <v-flex v-if="rides.length === 0"
        ><h1 class="text-center">No Available Passengers!</h1></v-flex
      >

      <v-card
        v-for="(ride, index) in rides"
        :key="index"
        class="mx-auto"
        max-width="344"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-display mb-1">
              From: {{ ride.data().originName }}
            </v-list-item-title>
            <v-list-item-title class="text-display mb-1">
              To: {{ ride.data().destinationName }}
            </v-list-item-title>
            <v-list-item-title class="text-display mb-1">
              Distance: 42km
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-text-field
          outlined
          rounded
          number
          v-model="bidPrice"
          label="Bid Price"
          class="mx-2"
        >
          Bid
        </v-text-field>

        <v-card-actions class="d-flex justify-center">
          <v-btn
            dark
            rounded
            @click="bid({ path: ride.ref.path, ...taxiInfo, price: bidPrice })"
            color="blue lighten-1"
          >
            Bid
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
import { logout, getRides, bidRide } from "../../firebase";
export default {
  name: "TaxiDashboard",
  data: () => ({
    mapStyle: {
      width: "calc(100vw)",
      height: "45vh",
    },
  }),
  methods: {
    checkIfBidded(bids) {
      let bidded = false;
      for (let i = 0; i < bids.length; i++) {
        const bid = bids[i];
        if (bid.uid === this.taxiInfo.uid) {
          bidded = true;
          break;
        }
      }
      return bidded;
    },
    bid(payload) {
      return bidRide(payload).then(() => {
        getRides();
      });
    },
    getAddress(coordinates) {
      console.log(coordinates);
      return "Mbabane";
    },

    signout() {
      console.log("logout");
      logout()
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
  },
  computed: {
    initials() {
      return this.$store.getters.getUserInitials;
    },
    taxiInfo() {
      const uid = this.$store.getters.getUID;
      const name = this.$store.getters.getUserDocumentSnapshot.data().name;
      const registration =
        this.$store.getters.getUserDocumentSnapshot.data().registration;
      const surname =
        this.$store.getters.getUserDocumentSnapshot.data().surname;
      return {
        uid,
        name,
        surname,
        registration,
      };
    },
    rides() {
      return this.$store.getters.getAvailableRides.filter(
        (ride) =>
          ride.data().bids.length === 0 ||
          ride.data().bids.find((bid) => bid.uid == this.taxiInfo.uid) != null
      );
    },
    myCoordinates() {
      if (this.$store.getters.getOrigin == null)
        return {
          lat: 0,
          lng: 0,
        };
      return this.$store.getters.getOrigin;
    },
  },
  created() {
    this.$getLocation({}).then((coordinates) => {
      //this.myCoordinates = coordinates;
      this.$store.dispatch("setOrigin", coordinates);
    });
  },
  mounted() {
    getRides();
  },
};
</script>
