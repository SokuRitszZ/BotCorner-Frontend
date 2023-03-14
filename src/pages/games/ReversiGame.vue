<template>
  <div class="">
    <h1 class="text-7xl font-thin">Reversi Game</h1>
  </div>
</template>

<script setup lang="ts">
import useGameStore from '@/store/gameStore';
import useMatchStore from '@/store/matchStore';
import useUserStore from '@/store/userStore';
import { onMounted, ref } from 'vue';

const gameStore = useGameStore();
const matchStore = useMatchStore();
const userStore = useUserStore();

const turn = ref<number>(0);
const counts = ref<[number, number]>();

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

<style scoped lang="scss"></style>
