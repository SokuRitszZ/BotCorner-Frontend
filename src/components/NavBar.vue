<template>  
  <nav class="fixed top-0 left-0 w-screen py-5 bg-gray-700 z-10">
    <div class="m-auto max-w-7xl px-10 relative">
      <div class="flex justify-between">
        <div class="flex items-center justify-start gap-10 relative">
          <div class="icon">
            <img class="block h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company">
          </div>
          <div class="nav_s flex justify-start gap-3 self-start">
            <RouterLink class="transition font-bold text-white py-1 px-3 rounded-lg hover:bg-gray-900 active:900" v-for="url in urls" :to="url.path">{{ url.name }}</RouterLink>
          </div>
        </div>
        <div>
          <Profile/>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Profile from './Profile.vue';

export type IUrl = {
  path: string
  name: string
};
const props = defineProps({
  urls: {
    type: Array<IUrl>,
  },
});
</script>

<style scoped lang="scss">
.router-link-exact-active {
  @apply bg-gray-900;
}
</style>