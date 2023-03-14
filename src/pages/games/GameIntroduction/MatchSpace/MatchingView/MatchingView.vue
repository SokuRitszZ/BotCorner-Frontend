<script setup lang="ts">
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import SokuSpinner from '@/components/SokuComponent/SokuSpinner/SokuSpinner.vue';
import useMatchStore from '@/store/matchStore';
import useUserStore from '@/store/userStore';
import { onMounted } from 'vue';

const userStore = useUserStore();
const matchStore = useMatchStore();

function cancelMatch() {
  matchStore.status = 'to-match';
}

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  matchStore.status = 'matched';
});
</script>
<template>
  <div class="matching-view">
    <SokuImgSkeleton class="avatar" :url="userStore.avatar" />
    <SokuSpinner class="bg-black w-full mt-1" />
    <span class="username">{{ userStore.username }}</span>
    <span class="username">[机器人]</span>
    <span class="title mt-4">匹配中...</span>
    <button @click="cancelMatch" class="btn mt-4">取消匹配</button>
  </div>
</template>
<style scoped lang="scss">
@import url('./style.scss');
</style>
