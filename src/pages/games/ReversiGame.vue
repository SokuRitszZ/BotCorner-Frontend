<script setup lang="ts">
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import useGameStore from '@/store/gameStore';
import useMatchStore from '@/store/matchStore';
import useUserStore from '@/store/userStore';
import { onMounted, ref } from 'vue';

const gameStore = useGameStore();
const matchStore = useMatchStore();
const userStore = useUserStore();

const turn = ref<number>(0);
const counts = ref<[number, number]>([0, 0]);
const flag = ['黑方', '白方'];

onMounted(async () => {
  const server = matchStore.server!;
  gameStore.clearEvents();

  gameStore.on('prepare', () => {
    turn.value = -1;
    counts.value = [0, 0];
  });
  gameStore.on('put chess', (data: any) => {
    counts.value = data.cnt;
    turn.value = data.id ^ 1;
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
  gameStore.on('pass', (id: number) => {
    window._alert('primary', `${id ? '白子' : '黑子'}跳过`);
    turn.value = id;
  });
});
</script>

<template>
  <div class="reversi-game relative">
    <div v-for="i in 2" :key="i" class="flex flex-col items-center">
      <span class="text-4xl font-thin">{{ flag[i - 1] }}</span>
      <SokuImgSkeleton
        class="avatar"
        :url="matchStore.usersMatch[i - 1].avatar"
      />
      <span>
        {{ matchStore.usersMatch[i - 1].username }}
      </span>
      <span class="text-3xl font-thin">{{ counts[i - 1] }}</span>
    </div>
    <div class="text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{{ flag[turn] }}</div>
  </div>
</template>

<style scoped lang="scss">
.reversi-game {
  @apply w-full;
  @apply flex justify-around items-center;
  .avatar {
    @apply w-[100px] h-[100px];
  }
}
</style>
