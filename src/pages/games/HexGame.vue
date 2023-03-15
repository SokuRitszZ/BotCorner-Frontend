<script setup lang="ts">
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import useBindEvent from '@/hooks/useBindEvent';
import useGameStore from '@/store/gameStore';
import useMatchStore from '@/store/matchStore';
import useUserStore from '@/store/userStore';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const gameStore = useGameStore();
const turn = ref<number>(-1);
const flag = ['红方', '蓝方'];

useBindEvent('set step truly', () => {
  turn.value ^= 1;
});

const matchStore = useMatchStore();

onMounted(() => {
  const server = matchStore.server!;

  gameStore.clearEvents();

  gameStore.on('prepare', () => {
    turn.value = 0;
  });
  gameStore.on('click', (data: any) => {
    if (gameStore.game!.mode === 'single') {
      server.sendMessage('set step', data);
    } else if (gameStore.game!.mode === 'multi') {
      server.sendMessage('set step', {
        ...data,
        id: matchStore.getIndex(userStore.id),
      });
    }
  });
});
</script>

<template>
  <div class="w-full flex justify-around items-center relative">
    <div v-for="i in 2" :key="i" class="flex flex-col items-center">
      <span
        class="text-3xl font-bold"
        :class="[(i - 1 && 'text-blue-700') || 'text-red-700']"
        >{{ flag[i - 1] }}</span
      >
      <SokuImgSkeleton
        class="w-[100px] h-[100px]"
        :url="matchStore.usersMatch[i - 1].avatar"
      />
      <span class="text-xl font-thin">{{ matchStore.usersMatch[i - 1].username }}</span>
    </div>
    <div
      class="text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
      :class="[(turn && 'text-blue-700') || 'text-red-700']"
    >
      {{ flag[turn] }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
