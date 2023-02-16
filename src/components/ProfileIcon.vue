<script setup lang="ts">
import Settings from "@/pages/SettingsView.vue";
import useCacheStore from "@/store/cacheStore";
import useUserStore from "@/store/userStore";
import { throttle } from "lodash";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import SokuButton from "./SokuButton.vue";
import SokuWindow from "./SokuWindow.vue";

const isShownUserMenu = ref<boolean>(false);
const userStore = useUserStore();
const cacheStore = useCacheStore();
const username = ref<string>("");
const password = ref<string>("");
const router = useRouter();

const login = throttle(() => {
  userStore.getTokenByApi(username.value, password.value);
}, 1000);

const logout = () => {
  userStore.logout();
  cacheStore.emptyBots();
  router.push("/");
};

onMounted(() => {
  userStore.getInfo().catch(() => {});
});

const $window_register = ref();

const toRegister = () => {
  $window_register.value.open();
};

const register_info = ref<{
  username: string;
  password: string;
  confirmed_password: string;
}>({
  username: "",
  password: "",
  confirmed_password: "",
});

const register = throttle(() => {
  userStore.register(
    register_info.value.username,
    register_info.value.password,
    register_info.value.confirmed_password
  );
}, 4000);

const $window_settings = ref();

function toUpdateAvatar() {
  $window_settings.value.open();
}
</script>

<template>
  <Settings ref="$window_settings" />
  <div class="relative w-96 h-full flex items-center">
    <Transition name="profile">
      <!-- Input -->
      <div
        key="not"
        v-if="userStore.status === 'not logged in'"
        class="absolute right-0"
      >
        <div class="flex justify-center items-center gap-2">
          <input
            placeholder="用户名"
            v-model="username"
            name="username"
            class="px-2 rounded-md w-40"
            type="text"
          />
          <input
            placeholder="密码"
            v-model="password"
            name="password"
            class="px-2 rounded-md w-40"
            type="password"
          />
          <soku-button
            @click="login"
            type="normal"
            class="px-2 py-1 font-bold whitespace-nowrap"
          >
            登录
          </soku-button>
          <soku-button
            @click="toRegister"
            type="success"
            class="px-2 py-1 font-bold whitespace-nowrap"
          >
            注册
          </soku-button>
          <soku-window ref="$window_register" title="注册">
            <div class="w-full h-full p-3 m-auto flex flex-col gap-3">
              <label class="" for="username">用户名</label>
              <input
                v-model="register_info['username']"
                name="username"
                type="text"
                class="w-full col-span-2 rounded-md px-2 outline-purple-700"
              />
              <label class="" for="password">密码</label>
              <input
                v-model="register_info['password']"
                name="password"
                type="password"
                class="w-full col-span-2 rounded-md px-2 outline-purple-700"
              />
              <label class="" for="confirmed_password">确认密码</label>
              <input
                v-model="register_info['confirmed_password']"
                name="confirmed_password"
                type="password"
                class="w-full col-span-2 rounded-md px-2 outline-purple-700"
              />
              <soku-button @click="register" class="px-3 py-1 m-auto"
                >注册</soku-button
              >
            </div>
          </soku-window>
        </div>
      </div>
      <!-- Loading -->
      <div
        key="ing"
        class="text-white mt-1 flex flex-row-reverse items-center absolute right-0"
        v-else-if="userStore.status === 'logging in'"
      >
        登录中...
      </div>
      <!-- Profile -->
      <div
        v-else-if="userStore.status === 'logged in'"
        class="flex flex-row-reverse absolute right-0"
      >
        <button
          key="ed"
          id="user-menu-button"
          @click="() => (isShownUserMenu = !isShownUserMenu)"
          @blur="() => (isShownUserMenu = false)"
          class="flex rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span class="sr-only"> User Profile </span>
          <img
            class="w-8 h-8 rounded-full"
            :src="(userStore.avatar as string)"
          />
        </button>
      </div>
    </Transition>
    <Transition name="user-menu">
      <div
        v-show="isShownUserMenu"
        class="absolute right-0 top-8 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        <!-- Active: "bg-gray-100", Not Active: "" -->
        <div
          @click="toUpdateAvatar"
          class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-0"
        >
          更换头像
        </div>
        <div
          @click="logout"
          class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-1"
        >
          登出
        </div>
      </div>
    </Transition>
  </div>
</template>

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
  @apply transition ease-out duration-100;
}
.user-menu-leave-active {
  @apply transition ease-in duration-75;
}
.user-menu-enter-from,
.user-menu-leave-to {
  @apply transform opacity-0 scale-95;
}
.user-menu-enter-to,
.user-menu-leave-from {
  @apply transform opacity-100 scale-100;
}
</style>
