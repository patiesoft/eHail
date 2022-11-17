<template>
  <v-row
    justify="center"
    align="center"
    class="layout-height gradient-background-color"
  >
    <v-progress-circular
      :size="50"
      color="green"
      indeterminate
      v-if="showLoader"
    ></v-progress-circular>
    <v-col v-else>
      <v-row justify="center">
        <h1 class="text-center mb-9 text-h3 font-weight-bold">e'Hail</h1>
      </v-row>
      <v-row justify="center">
        <h4 class="text-center mb-9">Signing In...</h4>
      </v-row>
      <v-row justify="center" align="center">
        <v-text-field
          label="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          outlined
          rounded
          class="px-3 input-max-width mx-3"
          @click:append="showPassword = !showPassword"
          :rules="rules"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
        ></v-text-field>
        <v-col cols="12" class="d-flex justify-center"
          ><v-btn rounded @click="signin" color="success" large
            >SignIn</v-btn
          ></v-col
        >
        <v-col cols="12" class="d-flex justify-center"
          ><a class="text-center">forgot password?</a></v-col
        >
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { login } from "../firebase";
export default {
  name: "PasswordPage",
  data: () => ({
    showLoader: false,
    password: null,
    showPassword: false,
    rules: [
      /*() => {
        if (!this.email) return "Email required";
        return true;
        },*/
    ],
  }),
  methods: {
    signin() {
      this.showLoader = true;
      console.log("signin");
      return login({
        email: this.$store.getters.getSetEmail,
        password: this.password,
      })
        .then(() => {
          console.log("logged In");
        })
        .catch(() => {
          this.showLoader = false;
        })
        .finally(() => {
          this.showLoader = false;
        });
    },
  },
};
</script>
<style>
.layout-height {
  height: 100vh;
}
.gradient-background-color {
  background: linear-gradient(0.25turn, #f3e5f5, white);
}
</style>
