<script setup lang="ts">
import NavBar, { IUrl } from "@/components/NavBar.vue";
import Alert from "./components/SokuAlert.vue";

const urls: IUrl[] = [
  { path: "/", name: "首页" },
  { path: "/game", name: "游戏" },
  { path: "/rating", name: "排名" },
  { path: "/bots", name: "管理Bots" },
];
</script>

<template>
  <Alert />
  <NavBar :urls="urls" />
  <div class="w-screen h-screen">
    <router-view />
  </div>
</template>

<style scoped></style>
