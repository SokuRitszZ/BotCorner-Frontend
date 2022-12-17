<template>
  <div>
    <Transition name="profile">
      <!-- Input -->
      <div key="not" v-if="userStore.status === 'not logged in'">
        <form @submit.prevent="handleSubmitLogin">
          <input v-model="username" name="username" class="mx-2 px-2 rounded-md w-40" type="text">
          <input v-model="password"  name="password" class="mx-2 px-2 rounded-md w-40" type="password">
          <button @click="() => hasLogin = false" class="bg-purple-500 rounded-md text-white px-2">登录</button>
        </form>
      </div>
      <!-- Loading -->
      <div key="ing" class="text-white" v-else-if="userStore.status === 'logging in'">
        登录中...
      </div>
      <!-- Profile -->
      <button key="ed" v-else-if="userStore.status === 'logged in'" id="user-menu-button"
        @click="() => isShownUserMenu = !isShownUserMenu" @blur="() => isShownUserMenu = false"
        class="flex rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        aria-expanded="false" aria-haspopup="true">
        <span class="sr-only"> User Profile </span>
        <img class="w-8 h-8 rounded-full" src="https://sdfsdf.dev/100x100.png,ffffff,000000" alt="">
      </button>
    </Transition>
    <Transition name="user-menu">
      <div
        v-show="isShownUserMenu"
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
        <!-- Active: "bg-gray-100", Not Active: "" -->
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/userStore';
import { ref } from 'vue';

const hasLogin = ref<boolean>(true);
const isShownUserMenu = ref<boolean>(false);
const userStore = useUserStore();
const username = ref<String>();
const password = ref<String>();

const handleSubmitLogin = (e: Event): void => {
  console.log(username.value, password.value);
};

</script>

<style scoped lang="scss">

.user-menu-enter-active {
  @apply transition ease-out duration-100
}
.user-menu-leave-active {
  @apply transition ease-in duration-75
}
.user-menu-enter-from,
.user-menu-leave-to {
  @apply transform opacity-0 scale-95
}
.user-menu-enter-to,
.user-menu-leave-from {
  @apply transform opacity-100 scale-100
}

</style>