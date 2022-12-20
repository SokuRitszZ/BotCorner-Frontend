<script setup lang="ts">
import NavBar, { IUrl } from '@/components/NavBar.vue';

const urls: IUrl[] = [
  { path: "/", name: "首页", },
  { path: "/game", name: "游戏", },
  { path: "/bots", name: "管理Bots", },
];

</script>

<template>
  <NavBar :urls="urls"/>
  <div class="w-screen h-screen">
    <router-view />
  </div>
</template>

<style scoped>

</style>
