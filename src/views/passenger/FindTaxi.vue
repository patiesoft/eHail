<template>
  <v-container fluid>
    <v-app-bar app color="#f3e5f5" elevate-on-scroll height="70px">
      <v-spacer />
      <v-flex>
        <v-img
          src="../../assets/taxify.svg"
          max-height="30px"
          max-width="30px"
        ></v-img>
        <v-toolbar-title class="text-h5 ml-2 font-weight-bold"
          >Taxify</v-toolbar-title
        >
      </v-flex>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-img src="../../assets/taxi.svg" max-height="30" max-width="30">
        </v-img>
      </v-btn>

      <v-btn icon>
        <notification-bell
          :size="30"
          :count="0"
          :upperLimit="50"
          counterLocation="upper right"
          counterStyle="roundRectangle"
          counterBackgroundColor="#FF0000"
          counterTextColor="#FFFFFF"
          iconColor="#FFFFFF"
          class="mx-7"
        />
      </v-btn>

      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar dense v-bind="attrs" v-on="on" color="white">PV</v-avatar>
        </template>
        <v-list>
          <v-list-item :to="{ name: 'userprofile' }">
            <v-list-item-title> Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title> logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
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
              :clickable="true"
              :draggable="true"
              @click="center = myCoordinates"
            />
          </GmapMap>
        </v-row>
      </v-container>
      <!--<v-text-field label="Destination" outlined class="mx-2"></v-text-field>-->
      <TaxisComponent :taxis="availableTaxis" />
    </v-layout>
  </v-container>
</template>

<script>
import NotificationBell from "vue-notification-bell";
import TaxisComponent from "../../components/TaxisComponent.vue";
export default {
  name: "PassengerDashboard",
  data: () => ({
    dialog: false,
    mapCols: 9,
    drawer: true,
    mini: true,
    sections: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    mapStyle: {
      width: "calc(100vw)",
      height: "45vh",
    },
    myCoordinates: {
      lat: 0,
      lng: 0,
    },
  }),
  components: {
    NotificationBell,
    TaxisComponent,
  },
  created() {
    this.$getLocation({}).then((coordinates) => {
      this.myCoordinates = coordinates;
    });
  },
  methods: {
    searchDestination() {
      console.log("Search destination");
    },
  },
  computed: {
    availableTaxis() {
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
};
</script>
<style>
.scrollable {
  overflow-y: scroll;
}
</style>
