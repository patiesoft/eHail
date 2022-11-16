<template>
  <v-layout column class="mt-6">
    <h1 class="text-center text-h4 font-weight-regular">Taxi Details</h1>
    <v-divider class="mb-5" />
    <v-row justify="center">
      <v-divider class="mb-5" />
      <v-col cols="12">
        <h1 class="text-h6 font-weight-regular">
          Driver: {{ taxi.name }} {{ taxi.surname }}
        </h1>
        <h1 class="text-h6 font-weight-regular">
          Registration: {{ taxi.registration }}
        </h1>
        <v-chip dark class="font-weight-bold green">Available</v-chip>
      </v-col>
    </v-row>
    <v-btn rounded @click="$router.push('/passenger/pay-taxi')" class="mt-6"
      >Select</v-btn
    >
    <v-btn rounded @click="$router.push('/passenger/select-taxi')" class="mt-3"
      >Taxis</v-btn
    >
  </v-layout>
</template>
<script>
export default {
  name: "TaxiView",
  data() {
    return {
      nameClass: ["text-body-1"],
      headerClass: ["text-h5 "],
    };
  },
  computed: {
    taxi() {
      return this.$store.getters.getSelectedTaxi;
    },
  },
};
</script>
