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
    name: "game lobby",
    component: () => import("@/pages/GameLobby.vue"),
  },
  {
    path: "/bots",
    name: "botsmanage",
    component: () => import("@/pages/BotsManage.vue"),
  },
  {
    path: "/rating",
    name: "rating",
    component: () => import("@/pages/Rating.vue"),
  },
  {
    path: "/game/:game",
    name: "game",
    component: () => import("@/pages/games/Game.vue"),
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
