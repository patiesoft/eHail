<template>
  <v-footer padless color="black" dark app fixed>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>Taxify</strong>
    </v-col>
  </v-footer>
</template>
<script>
export default {
  name: "FooterComponent",
};
</script>
