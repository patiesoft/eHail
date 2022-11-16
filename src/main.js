import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import Geolocation from "vue-browser-geolocation";
import * as VueGeolocation from "vue2-google-maps";

Vue.use(Geolocation);
Vue.use(VueGeolocation, {
  load: {
    key: "AIzaSyB1oFD8l6nVod4FU4XuFxxlbDw2uxhTUf0",
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
