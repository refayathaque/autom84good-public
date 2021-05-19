import { createRouter, createWebHistory } from "vue-router";

import Auth from "./pages/Auth.vue";
import DyDb from "./pages/DyDb.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/auth" },
    { path: "/auth", component: Auth },
    { path: "/dydb", component: DyDb },
  ],
});
