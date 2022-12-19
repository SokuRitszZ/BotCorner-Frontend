import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: () => import("@/pages/Welcome.vue"),
  },
  {
    path: "/game",
    name: "game",
    component: () => import("@/pages/Game.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
