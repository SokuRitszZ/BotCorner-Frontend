<script setup lang="ts">
import RouteSidebar from './components/RouteSidebar.vue';
import Alert from './components/SokuComponent/SokuAlert.vue';

</script>

<template>
  <Alert />
  <RouteSidebar />
  <div class="w-screen h-screen">
    <router-view />
  </div>
</template>

<style scoped></style>
