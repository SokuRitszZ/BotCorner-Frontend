<script setup lang="ts">
import RouteSidebar from './components/RouteSidebar.vue';
import Alert from './components/SokuComponent/SokuAlert.vue';

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