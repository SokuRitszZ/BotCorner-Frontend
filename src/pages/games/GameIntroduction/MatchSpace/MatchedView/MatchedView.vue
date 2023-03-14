<script setup lang="ts">
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import useMatchStore from '@/store/matchStore';

const matchStore = useMatchStore();

function exitMatch() {
  matchStore.status = 'to-match';
}
</script>

<template>
  <div class="matched-view">
    <h3>点击以准备/取消准备</h3>
    <button class="user" :class="[matchStore.okPrepare[idx] ? 'active' : '']" v-for="(user, idx) of matchStore.usersMatch" :key="user.id">
      <SokuImgSkeleton class="avatar" :url="user.avatar" />
      <div class="username">{{ user.username }}</div>
    </button>
    <button @click="exitMatch" class="btn">退出匹配</button>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
