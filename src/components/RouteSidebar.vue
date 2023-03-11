<script setup lang="ts">
import SokuSidebar from '@/components/SokuComponent/SokuSidebar/SokuSidebar.vue';
import SidebarList from '@/components/SokuComponent/SokuSidebar/SidebarList.vue';
import SidebarItem from '@/components/SokuComponent/SokuSidebar/SidebarItem.vue';

const optionsInSidebar = [
  {
    title: '账号',
    items: [
      { title: '个人主页', to: '/user/profile' },
      { title: '修改资料', to: '/user/profile/edit' },
    ],
  },
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
];
</script>

<template>
  <SokuSidebar>
    <template v-slot:header>
      <div class="w-full h-full flex justify-center items-center">
        <img src="https://sdfsdf.dev/100x100.png" alt="" />
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
  </SokuSidebar>
</template>
