<script setup lang="ts">
import useBindEvent from '@/hooks/useBindEvent';
import useGameStore from '@/store/gameStore';
import { onMounted } from 'vue';
import GameScreen from '../GameScreen/GameScreen.vue';

useBindEvent('tell result', (data: any) => {
  window._alert('success', `游戏结束：${data.result}`, 10000);
  window._alert('primary', `战败原因：${data.reason}`, 10000);
});

const gameStore = useGameStore();

onMounted(() => {
  gameStore.game = null;
});
</script>

<template>
  <div class="game-base-page">
    <GameScreen />
    <div class="w-full">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
