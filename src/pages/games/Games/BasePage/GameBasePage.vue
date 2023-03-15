<script setup lang="ts">
import RecordPlayer from '@/components/RecordPlayer/RecordPlayer.vue';
import useBindEvent from '@/hooks/useBindEvent';
import useGameStore from '@/store/gameStore';
import { onMounted, onUnmounted, ref } from 'vue';
import GameScreen from '../GameScreen/GameScreen.vue';

useBindEvent('tell result', (data: any) => {
  window._alert('success', `游戏结束：${data.result}`, 10000);
  window._alert('primary', `战败原因：${data.reason}`, 10000);
});

const gameStore = useGameStore();

onMounted(() => {
  gameStore.game = null;
});

const isRecordMode = ref(false);

onMounted(() => {
  if (gameStore.record) {
    isRecordMode.value = true;
  }
});

onUnmounted(() => {
  gameStore.record = undefined;
});

function back() {
  gameStore.game = null;
}

</script>

<template>
  <div class="game-base-page">
    <div class="flex justify-end">
      <button @click="back" class="bg-gray-200 active:300 px-2 font-thin rounded-sm mb-2">返回</button>
    </div>
    <GameScreen />
    <RecordPlayer v-if="isRecordMode" />
    <div class="w-full">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
