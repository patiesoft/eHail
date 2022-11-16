<template>
  <v-row
    justify="center"
    align="center"
    class="layout-height gradient-background-color"
  >
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      v-if="showLoader"
      >Signing In</v-progress-circular
    >
    <v-card elevation="2" min-width="50vw" class="py-2" v-else>
      <v-card-title
        class="text-center text-h5 font-weight-bold d-flex justify-center mb-5"
      >
        {{ registrationType }} Registration
        <v-spacer />
        <v-btn
          large
          depressed
          @click="changeRegistrationType"
          rounded
          outlined
          color="red darken-3"
          class="mt-4"
        >
          Change Registration
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-row class="mx-1 my">
        <v-col>
          <v-text-field label="Name" outlined v-model="name"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-1 my">
        <v-col>
          <v-text-field
            label="Surname"
            outlined
            v-model="surname"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-1 my" v-if="registrationType === 'Taxi'">
        <v-col>
          <v-text-field
            label="Registration"
            outlined
            v-model="registration"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-1">
        <v-col>
          <v-text-field
            label="Phone Number"
            outlined
            v-model="phoneNumber"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-1">
        <v-col>
          <v-text-field
            label="Password"
            outlined
            v-model="password"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- <v-row class="mx-1">
          <v-col>
            <v-text-field
              label="Confirm Password"
              outlined
              v-model="confirmPassword"
            ></v-text-field>
          </v-col>
        </v-row>-->
      <v-divider />
      <v-row class="mt-1 mb-2" justify="center">
        <v-col class="d-flex justify-center">
          <v-btn
            x-large
            outlined
            color="#AB47BC"
            class="font-weight-bold"
            @click="register"
            ><v-icon> mdi-lead-pencil </v-icon>Register</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>
<script>
//import FooterComponent from "../components/FooterComponent.vue";
import { register } from "../firebase/auth.js";
export default {
  name: "RegistrationView",
  data: () => ({
    showLoader: false,
    registrationType: "Passenger",
    name: null,
    surname: null,
    phoneNumber: null,
    password: null,
    //confirmPassword: null,
    registration: null,
  }),
  computed: {
    canRegisterPassenger() {
      return (
        this.name !== null ||
        this.surname !== null ||
        this.phoneNumber !== null ||
        this.password !== null
      );
    },
    canRegisterTaxi() {
      return this.canRegisterPassenger || this.registration !== null;
    },
  },
  mounted() {
    console.log("checking set email");
    if (!this.$store.getters.getSetEmail) this.$router.push("/");
  },
  methods: {
    register() {
      this.showLoader = true;
      if (this.registrationType == "Passenger") {
        if (!this.canRegisterPassenger) {
          console.log("missing fields");
          this.showLoader = false;
          return;
        }
        return register({
          name: this.name,
          surname: this.surname,
          phoneNumber: this.phoneNumber,
          email: this.$store.getters.getSetEmail,
          password: this.password,
          type: "passenger",
        })
          .catch((error) => {
            console.log(error);
            alert(error);
            alert(this.$store.getters.getSetEmail);
          })
          .finally(() => {
            this.showLoader = false;
          });
      }
      if (this.registrationType == "Taxi") {
        if (!this.canRegisterTaxi) {
          console.log("missing fields");
          this.showLoader = false;
          return;
        }
        return register({
          name: this.name,
          surname: this.surname,
          phoneNumber: this.phoneNumber,
          password: this.password,
          email: this.$store.getters.getSetEmail,
          registration: this.registration,
          type: "taxi",
        })
          .catch((error) => {
            console.log(error);
            alert(error);
            alert(this.$store.getters.getSetEmail);
          })
          .finally(() => {
            this.showLoader = false;
          });
      }
    },
    changeRegistrationType() {
      if (this.registrationType === "Passenger")
        return (this.registrationType = "Taxi");
      return (this.registrationType = "Passenger");
    },
  },
};
</script>
