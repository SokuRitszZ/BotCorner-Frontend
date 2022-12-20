<template>  
  <nav class="nav">
    <div class="nav-inner">
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
        </div>
        <div class="absolute right-0 top-4 pr-2">
          <Profile />
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
.nav {
  @apply 
  fixed
  z-50
  w-screen
  bg-gray-800;
  
  &::before {
    content: '';
    @apply
    py-3
    h-fit
    relative;
  }
  

  .nav-link {
    @apply
    font-semibold
    text-gray-300 active:bg-gray-900 hover:bg-gray-700
    hover:text-white active:text-white
    px-3 py-2 rounded-md text-base;
    &.router-link-exact-active {
      @apply 
      bg-gray-900
      text-white
    }
}

;

  .nav-inner {
    @apply 
    mx-auto 
    max-w-7xl 
    px-2 sm:px-6 lg:px-8;

    .flex-box {
      @apply
      relative
      flex 
      h-16 
      items-center justify-between;

      .mobile-box {
        @apply 
        absolute
        inset-y-0
        left-0 
        flex 
        items-center  
        lg:hidden;
        
        .menu-button {
          @apply 
          inline-flex items-center justify-center
          rounded-md 
          p-2 
          text-gray-400 
          hover:bg-gray-700 hover:text-white 
          focus:outline-none focus:ring-2 focus:ring-white
        }
      }

      .pc-box {
        @apply 
        flex flex-1 items-center justify-center
        sm:items-stretch sm:justify-start;
        
        .company-box {
          @apply 
          flex flex-shrink-0 items-center;
          img {
            @apply h-8 w-auto;
          }
        }
      }
    }
  }
}
</style>