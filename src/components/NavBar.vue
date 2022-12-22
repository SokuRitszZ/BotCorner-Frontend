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
    <!-- <div class="nav-inner">
      <div class="flex-box">
        <div class="mobile-box">
          <button type="button" class="menu-button" aria-controls="mobile-menu" aria-expanded="false">
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="pc-box">
          <div class="company-box">
            <img class="block lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company">
            <img class="hidden lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company">
          </div>
          <div class="hidden lg:ml-6 lg:block">
            <div class="flex space-x-4">
              <RouterLink v-for="url in urls" :to="url.path" class="nav-link">{{ url.name }}</RouterLink>
            </div>
          </div>
          <div class="absolute right-0 h-10 max-w-100 w-100">
            <Profile />
          </div>
        </div>
      </div>
    </div> -->
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