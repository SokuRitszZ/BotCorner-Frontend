<script setup lang="ts">
import NavBar, { IUrl } from '@/components/NavBar.vue';

const urls: IUrl[] = [
  { path: "/", name: "首页", },
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
