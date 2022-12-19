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
  {
    path: "/404",
    name: "notfound",
    component: () => import("@/pages/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404"
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
