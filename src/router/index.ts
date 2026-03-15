import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/tasks", component: () => import("../views/TasksView.vue") },
    { path: "/shop", component: () => import("../views/ShopView.vue") },
  ],
});

export default router;
