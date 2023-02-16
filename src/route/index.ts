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
    component: () => import("@/pages/WelcomeView.vue"),
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
    component: () => import("@/pages/RatingView.vue"),
  },
  {
    path: "/game",
    name: "game",
    component: () => import("@/pages/games/GameView.vue"),
    meta: {
      auth: true,
    },
    children: [
      {
        path: "snake",
        name: "snake",
        component: () => import("@/pages/games/SnakeGame.vue"),
      },
      {
        path: "reversi",
        name: "reversi",
        component: () => import("@/pages/games/ReversiGame.vue"),
      },
      {
        path: "backgammon",
        name: "backgammon",
        component: () => import("@/pages/games/BackgammonGame.vue"),
      },
      {
        path: "gomoku",
        name: "gomoku",
        component: () => import("@/pages/games/GomokuGame.vue"),
      },
      {
        path: "hex",
        name: "hex",
        component: () => import("@/pages/games/HexGame.vue"),
      },
    ],
  },
  {
    path: "/lab",
    name: "lab",
    component: () => import("@/pages/LabView.vue"),
  },
  {
    path: "/404",
    name: "notfound",
    component: () => import("@/pages/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

import useUserStore from "./../store/userStore";

router.beforeEach((to, from, next) => {
  if (to.meta.auth && useUserStore().status !== "logged in") {
    window._alert("danger", "请先登录");
    next(from);
  } else {
    next();
  }
});

export default router;
