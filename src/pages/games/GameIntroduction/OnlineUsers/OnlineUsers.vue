<script setup lang="ts">
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
</script>

<template>
  <div class="online-users">
    <h2 class="title">在线用户</h2>
    <div class="users-container">
      <SokuImgSkeleton
        v-for="i in 10"
        :key="i"
        class="avatar"
        :url="`http://localhost:3000/100x100.png,${
          (Math.random() * 10 ** 6) >>> 0
        },${(Math.random() * 10 ** 6) >>> 0}`"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("./style.scss");
</style>
