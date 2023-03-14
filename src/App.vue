<script setup lang="ts">
import { onMounted } from 'vue';
import RouteSidebar from './components/RouteSidebar.vue';
import Alert from './components/SokuComponent/SokuAlert.vue';
import useGameStore from './store/gameStore';
import useUserStore from './store/userStore';

const userStore = useUserStore();

onMounted(async () => {
  try {
    await userStore.getInfo();
    await useGameStore();
  } catch (e) {
    window._alert('danger', '登录失败，请重试');
  }
});
</script>

<template>
  <Alert />
  <div class="flex">
    <RouteSidebar />
    <div class="main-view">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-view {
  width: calc(100vw - 250px);
  min-width: 680px;
  height: 100vh;
  overflow: scroll;
  @apply py-10;
}
</style>
