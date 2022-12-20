<template>
  <div>
    <Transition name="profile">
      <!-- Input -->
      <div key="not" v-if="userStore.status === 'not logged in'" class="block mt-1">
        <div class="flex">
          <input placeholder="用户名" v-model="username" name="username" class="mx-2 px-2 rounded-md w-40" type="text">
          <input placeholder="密码" v-model="password" name="password" class="mx-2 px-2 rounded-md w-40" type="password">
          <button @click="login"
          class="bg-purple-500 rounded-md text-white px-2 hover:bg-purple-600 active:bg-purple-700 font-semibold">登录</button>
        </div>
      </div>
      <!-- Loading -->
      <div key="ing" class="text-white mt-1" v-else-if="userStore.status === 'logging in'">
        登录中...
      </div>
      <!-- Profile -->
      <div v-else-if="userStore.status === 'logged in'" class="flex flex-row-reverse">
        <button key="ed" id="user-menu-button"
        @click="() => isShownUserMenu = !isShownUserMenu" @blur="() => isShownUserMenu = false"
        class="flex rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        aria-expanded="false" aria-haspopup="true">
        <span class="sr-only"> User Profile </span>
        <img class="w-8 h-8 rounded-full" src="https://sdfsdf.dev/100x100.png,ffffff,000000" alt="">
      </button>
    </div>
    </Transition>
    <Transition name="user-menu">
      <div
        v-show="isShownUserMenu"
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
        <!-- Active: "bg-gray-100", Not Active: "" -->
        <p class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</p>
        <p class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</p>
        <p @click="userStore.logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/userStore';
import { ref } from 'vue';

const isShownUserMenu = ref<boolean>(false);
const userStore = useUserStore();
const username = ref<String>();
const password = ref<String>();

const login = (e: Event): void => {
  userStore.status = "logging in";
  setTimeout(() => {
    userStore.status = "logged in";
  }, 2000);
  console.log(username.value, password.value);
};

</script>

<style scoped lang="scss">

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.profile-enter-active {
  animation: fadeIn 1s;
}

.profile-leave-active {
  animation: fadeOut 0.5s;
}

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