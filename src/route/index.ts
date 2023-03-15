import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/WelcomeView/WelcomeView.vue'),
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import('@/pages/UserProfileView/UserProfileView.vue'),
    children: [
      {
        path: 'bots',
        name: 'profile-bots',
        component: () => import('@/pages/UserProfileView/BotList/BotList.vue'),
      },
      {
        path: 'comments',
        name: 'profile-comments',
        component: () => import('@/pages/ForwardPreview.vue'),
      },
      {
        path: 'prize',
        name: 'profile-prize',
        component: () => import('@/pages/ForwardPreview.vue'),
      },
    ],
  },
  {
    path: '/user/profile/edit',
    name: 'profile-edit',
    component: () => import('@/pages/UserEditView/UserEditView.vue'),
  },
  {
    path: '/user/other/:id',
    name: 'profile-other',
    component: () =>
      import('@/pages/OtherUserProfileView/OtherUserProfileView.vue'),
    children: [
      {
        path: 'bots',
        name: 'profile-other-bots',
        component: () => import('@/pages/OtherUserProfileView/BotList/BotList.vue'),
      },
      {
        path: 'comments',
        name: 'profile-other-comments',
        component: () => import('@/pages/ForwardPreview.vue'),
      },
      {
        path: 'prize',
        name: 'profile-other-prize',
        component: () => import('@/pages/ForwardPreview.vue'),
      },
    ],
  },
  {
    path: '/game/lobby',
    name: 'game-lobby',
    component: () => import('@/pages/GameLobby/GameLobby.vue'),
  },
  {
    path: '/game/record',
    name: 'game-record',
    component: () => import('@/pages/RecordList/RecordList.vue'),
  },
  {
    path: '/game/rating',
    name: 'game-rating',
    component: () => import('@/pages/GameRating/RatingView.vue'),
  },
  {
    path: '/game/intro',
    name: 'game-intro',
    meta: {
      auth: true,
    },
    component: () =>
      import('@/pages/games/GameIntroduction/GameIntroduction.vue'),
  },
  {
    path: '/bots',
    name: 'botsmanage',
    component: () => import('@/pages/GameRating/RatingView.vue'),
  },
  {
    path: '/lab',
    name: 'lab',
    component: () => import('@/pages/LabView.vue'),
  },
  {
    path: '/404',
    name: 'notfound',
    component: () => import('@/pages/NotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

import useUserStore from './../store/userStore';

router.beforeEach((to, from, next) => {
  if (to.meta.auth && useUserStore().status !== 'logged in') {
    window._alert('danger', '请先登录');
    next(from);
  } else {
    next();
  }
});

export default router;
