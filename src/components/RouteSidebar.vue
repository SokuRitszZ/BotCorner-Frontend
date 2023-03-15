<script setup lang="ts">
import SokuSidebar from '@/components/SokuComponent/SokuSidebar/SokuSidebar.vue';
import SidebarList from '@/components/SokuComponent/SokuSidebar/SidebarList.vue';
import SidebarItem from '@/components/SokuComponent/SokuSidebar/SidebarItem.vue';
import { computed, ref } from 'vue';
import useUserStore from '@/store/userStore';
import SokuImgSkeleton from './SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import leftpad from '@/utils/leftpad';

const userStore = useUserStore();
const optionsInSidebar = computed(() => [
  ...((userStore.status === 'logged in' && [
    {
      title: '账号',
      items: [
        { title: '个人主页', to: '/user/profile' },
        { title: '修改资料', to: '/user/profile/edit' },
      ],
    },
  ]) ||
    []),
  {
    title: '使用',
    items: [
      { title: '首页', to: '/' },
      { title: '游戏大厅', to: '/game/lobby' },
      { title: '对战记录', to: '/game/record' },
      { title: '天梯排名', to: '/game/rating' },
    ],
  },
  {
    title: '反馈',
    items: [{ title: '报Bug', to: '/feedback/bug' }],
  },
]);

const isFocus = ref(false);

function toggleFocus() {
  isFocus.value = !isFocus.value;
}

function logout() {
  userStore.logout();
  toggleFocus();
}
</script>

<template>
  <SokuSidebar>
    <template v-slot:header>
      <div class="w-full h-full flex justify-center items-center">
        <img src="http://localhost:3000/100x100.png" alt="" />
      </div>
    </template>
    <template v-slot:main>
      <SidebarList
        v-for="o in optionsInSidebar"
        :key="o.title"
        :title="o.title"
      >
        <SidebarItem v-for="so in o.items" :key="so.title" :to="so.to">
          {{ so.title }}
        </SidebarItem>
      </SidebarList>
    </template>
    <template v-slot:footer>
      <div v-if="userStore.status === 'logged in'" class="w-full h-full flex justify-center items-center relative">
        <button @click="toggleFocus" class="flex items-center gap-2 p-1 rounded-full hover:bg-gray-200 w-[200px] transition">
          <SokuImgSkeleton :url="userStore.avatar" class="w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0" />
          <div class="flex flex-col justify-between max-w-[130px] flex-grow-0">
            <span class="font-bold text-xl overflow-hidden overflow-ellipsis">{{ userStore.username }}</span>
            <span class="font-thin text-gray-400 text-left">#{{ leftpad(8, userStore.id) }}</span>
          </div>
          <span class="font-bold">···</span>
        </button>
        <transition>
          <div v-if="isFocus" class="drop-up absolute w-[250px] h-fit py-2 bg-gray-100 -top-0 -translate-y-full left-3 rounded-xl transition">
            <button @click="logout" class="font-thin w-full px-4 hover:bg-gray-200 text-2xl overflow-hidden whitespace-nowrap overflow-ellipsis">登出 {{ userStore.username }}ofeijowiefjiefowj</button>
          </div>
        </transition>
      </div>
    </template>
  </SokuSidebar>
</template>

<style scoped lang="scss">
.drop-up {
  box-shadow: 0 0 10px #ddd;
}

.v-enter-active,
.v-leave-active {
  transition: .2s;
}
.v-enter-from,
.v-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}
.v-enter-to,
.v-leave-from {
  transform: translateY(-100%);
  opacity: 1;
}
</style>
