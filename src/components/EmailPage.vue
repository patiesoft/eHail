<template>
  <v-row
    justify="center"
    align="center"
    class="layout-height gradient-background-color"
  >
    <v-progress-circular
      :size="50"
      indeterminate
      color="green"
      v-if="showLoader"
    ></v-progress-circular>

    <v-col v-else>
      <v-row justify="center">
        <h1 class="text-center mb-9 text-h2 font-weight-bold">e'Hail</h1>
      </v-row>
      <v-row justify="center">
        <h4 class="text-center mb-9">Welcome</h4>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-text-field
            label="email"
            outlined
            rounded
            class="px-3"
            append-icon="mdi-arrow-right"
            @click:append="checkEmail"
            :rules="rules"
            v-model="email"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { checkIfUserExists } from "../firebase";
export default {
  name: "EmailPage",
  data: () => ({
    showLoader: false,
    email: null,
    rules: [
      /*() => {
        if (!this.email) return "Email required";
        return true;
        },*/
    ],
  }),
  methods: {
    async checkEmail() {
      this.showLoader = true;
      this.$store.dispatch("setEmail", this.email.trim().toLowerCase());
      if (!this.email) {
        this.showLoader = false;
        return this.rules.push("Email required");
      }
      this.$store.dispatch("setEmail", this.email.trim().toLowerCase());
      if (await checkIfUserExists(this.email.trim().toLowerCase())) {
        this.showLoader = false;
        return this.$router.push("./password-page");
      }
      this.showLoader = false;
      return this.$router.push("./registration");
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
