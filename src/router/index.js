import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "firstStep",
    component: () => import("../views/FirstStepView.vue"),
  },
  {
    path: "/secondStep",
    name: "secondStep",

    component: () => import("../views/SecondStepView.vue"),
  },
  {
    path: "/thirdStep",
    name: "thirdStep",

    component: () => import("../views/ThirdStepView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
