<script setup lang="ts">
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import useBindEvent from '@/hooks/useBindEvent';
import { IUser } from '@/store/userStore';
import { ref } from 'vue';

const users = ref<IUser[]>();

useBindEvent('init', (data: any) => {
  users.value = data.users;
});

useBindEvent('join', (data: any) => {
  users.value?.push(data);
});

useBindEvent('leave', (data: any) => {
  users.value = users.value?.filter(u => u.id !== data.id);
});
</script>

<template>
  <div class="online-users">
    <h2 class="title">在线用户</h2>
    <div class="users-container">
      <SokuImgSkeleton
        v-for="u in users"
        :key="u.id"
        class="avatar"
        :url="u.avatar"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("./style.scss");
</style>
