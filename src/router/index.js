import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/FirstStepView.vue"),
  },
  {
    path: "/about",
    name: "about",

    component: () => import("../views/SecondStepView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
