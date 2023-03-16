<script setup lang="ts">
import { getRatingsApi } from '@/api/ratings';
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import useUserStore from '@/store/userStore';
import useTitle from '@/utils/useTitle';
import { onMounted } from 'vue';

useTitle('个人主页 --BotCorner博弈小站');

type INav = {
  title: string;
  url: string;
};
const itemNav: INav[] = [
  {title: '自制程序', url: '/user/profile/bots'}, 
  {title: '发表看法', url: '/user/profile/comments'}, 
  {title: '获得奖项', url: '/user/profile/prize'}, 
];

const userStore = useUserStore();

onMounted(() => {
  getRatingsApi
});
</script>

<template>
  <div class="user-profile w-full h-full">
    <div class="-container">
      <header class="header">
        <SokuImgSkeleton
          class="background"
          :url="userStore.avatar"
          alt="background-img"
        />
      </header>
      <div class="profiles">
        <div class="profiles-container">
          <SokuImgSkeleton
            class="avatar"
            :url="userStore.avatar"
            alt="avatar"
          />
          <div class="sign">
            <div class="name">{{ userStore.username }}</div>
            <div class="signature">{{ userStore.signature || '这个人很懒，什么都没留下。' }}</div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <ul>
          <li v-for="it in itemNav" :key="it.title">
            <router-link class="router-link" :to="it.url">{{ it.title }}</router-link>
          </li>
        </ul>
      </nav>
      <div class="nav-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
