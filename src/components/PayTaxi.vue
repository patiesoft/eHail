<template>
  <v-container
    ><v-layout>
      <v-flex>E{{ price }}</v-flex>
      <v-flex><v-btn @click="pay">Pay</v-btn></v-flex>
    </v-layout></v-container
  >
</template>

<script>
export default {
  name: "PayTaxiComponent",
  data: () => ({
    price: 0,
  }),
  methods: {
    pay() {
      console.log("paying");
      this.$router.push("/passenger");
    },
  },
};
</script>
