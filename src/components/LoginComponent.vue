<template>
  <v-row align="center" justify="center" :style="rowStyle" refs="footer">
    <v-col :cols="cols">
      <v-card elevation="4" light tag="section">
        <v-card-title class="cardTitleStyle">
          <v-layout align-center justify-space-between>
            <p class="headline">
              {{ platformName }}
            </p>

            <p>
              <v-flex>
                <v-img
                  src="../assets/minibus-svgrepo-com.svg"
                  width="40px"
                  height="40px"
                >
                </v-img>
              </v-flex></p
          ></v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>Sign in with your email and password:</p>
          <v-form>
            <v-text-field
              outline
              label="Email"
              type="email"
              v-model="email"
              backgound-color="green lighten-4"
            ></v-text-field>
            <v-text-field
              outline
              hide-details
              label="Password"
              type="password"
              v-model="password"
              backgound-color="green lighten-4"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
          <a href>Forgot password?</a>
          <v-spacer></v-spacer>
          <v-btn
            color="#AB47BC"
            dark
            :large="$vuetify.breakpoint.smAndUp"
            @click="login"
          >
            <v-icon left>mdi-lock</v-icon>
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-layout align-center justify-space-between>
        <p class="caption my-3">
          <a href="#">Privacy Policy</a>
          |
          <a href="#">Terms of Service</a>
        </p>
        <p class="caption my-3">Powered by <a href="#">Taxify.com</a></p>
      </v-layout>
    </v-col>
  </v-row>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/configuration.js";
export default {
  name: "LoginComponent",
  data() {
    return {
      darkTheme: true,
      platformName: "Taxify",
      password: null,
      email: null,
      cardTitleStyle: {
        "backgound-color": "#690",
      },
      rowStyle: {
        "min-height": "calc(100vh - 500px)",
      },
    };
  },
  methods: {
    login: function () {
      if (!this.email || !this.password) return;
      console.log({ email: this.email, password: this.password });
      signInWithEmailAndPassword(auth, this.email, this.password).then(
        (res) => {
          console.log(res);
        }
      );
    },
  },
  computed: {
    cols() {
      let cols = 12;
      switch (this.$vuetify.breakpoint.name) {
        case "sm":
          cols = 12;
          break;
        case "md":
          cols = 10;
          break;
        case "lg":
          cols = 5;
          break;
        case "xl":
          cols = 8;
          break;
      }
      return cols;
    },
  },
};
</script>

<style>
.headline {
  font-size: 1rem;
}
</style>
