import Vue from "vue";
import VueRouter from "vue-router";
//import HomeView from "../views/HomeView.vue";
import EmailPage from "../components/EmailPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: EmailPage,
  },
  {
    path: "/registration",
    name: "registration",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegistrationView.vue"),
  },
  {
    path: "/password-page",
    name: "password-page",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/PasswordPage.vue"),
  },
  {
    path: "/taxi",
    component: () => import("../views/taxi/TaxiDashboard.vue"),
  },
  {
    path: "/passenger",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/passenger/Dashboard.vue"
      ),
    children: [
      {
        path: "",
        name: "findTaxi",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/FindTaxiComponent.vue"
          ),
        children: [],
      },
      {
        path: "select-taxi",
        name: "selectTaxi",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/SelectTaxiComponent.vue"
          ),
        children: [],
      },
      {
        path: "view-taxi",
        name: "viewTaxi",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/TaxiComponent.vue"
          ),
        children: [],
      },
      {
        path: "pay-taxi",
        name: "payTaxiComponent",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/PayTaxiComponent.vue"
          ),
        children: [],
      },
      {
        path: "wait-for-taxi",
        name: "wait-for-taxi",
        component: () => import("../components/WaitAndCommuteComponent.vue"),
      },
      {
        path: "commuting",
        name: "commuting",
        component: () => import("../components/PayTaxiComponent.vue"),
      },
    ],
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
