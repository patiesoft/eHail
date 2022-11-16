<template>
  <v-container class="flex justify-center gradient-background-color">
    <v-row class="height-100vh max-width" justify="center" align="center">
      <v-col>
        <p class="text-h1 font-weight-bold">Taxify</p>
        <p class="text-h4">Connecting People To Places</p>
        <v-btn
          dark
          color="#B71C1C"
          class="font-weight-bold"
          x-large
          @click="$router.push('/registration')"
          >Register Now !</v-btn
        >
        <v-btn dark color="black" class="mx-10 font-weight-bold" x-large
          >Contact Us</v-btn
        >
      </v-col>
      <v-col>
        <LoginComponent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginComponent from "../components/LoginComponent.vue";

export default {
  name: "LandingPage",

  components: {
    LoginComponent,
  },
};
</script>

<style>
.flex {
  display: flex;
  flex-direction: column nowrap;
}
.justify-center {
  justify-content: center;
}
.align-center {
  align-items: center;
}
.height-100vh {
  min-height: 100vh;
}

.height-60vh {
  min-height: 60vh;
}
.min-width {
  min-width: 80vw;
}
.max-width {
  max-width: 80vw;
}
.gradient-background-color {
  background: linear-gradient(0.25turn, #f3e5f5, white);
}
</style>
