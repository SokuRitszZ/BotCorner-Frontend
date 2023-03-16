<script setup lang="ts">
import SokuButton from '@/components/SokuComponent/SokuButton/SokuButton.vue';
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import SokuSpinner from '@/components/SokuComponent/SokuSpinner/SokuSpinner.vue';
import useBindEvent from '@/hooks/useBindEvent';
import useCacheStore from '@/store/cacheStore';
import useMatchStore from '@/store/matchStore';
import useUserStore from '@/store/userStore';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const matchStore = useMatchStore();

function cancelMatch() {
  matchStore.status = 'to-match';
  matchStore.server!.sendMessage('exit match', {
    id: matchStore.getIndex(userStore.id),
  });
}

const timerMatch = ref<any>();

onMounted(() => {
  // 用于确认后端收到开始匹配的信息
  timerMatch.value = setTimeout(() => {
    matchStore.status = 'to-match';
  }, 5000);
});

useBindEvent('start match', () => {
  clearTimeout(timerMatch.value);
});

useBindEvent('make match', (data: any) => {
  matchStore.usersMatch = data.userData;
  matchStore.status = 'matched';
  matchStore.okPrepare = Array.from({ length: data.userData.length }).map(
    () => false
  );
});

const cacheStore = useCacheStore();

const bot = cacheStore.bots.find((b) => b.id === matchStore.idBotSelected);
</script>

<template>
  <div class="matching-view">
    <SokuImgSkeleton class="avatar" :url="userStore.avatar" />
    <SokuSpinner class="spinner w-full mt-1" />
    <span class="username">{{ userStore.username }}</span>
    <span v-if="!!matchStore.idBotSelected" class="username"
      >[{{ bot!.title }}]</span
    >
    <span class="title mt-4">匹配中...</span>
    <SokuButton @click="cancelMatch" class="btn mt-4">取消匹配</SokuButton>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
