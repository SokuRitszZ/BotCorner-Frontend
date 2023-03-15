<script setup lang="ts">
import useBindEvent from '@/hooks/useBindEvent';
import useCacheStore from '@/store/cacheStore';
import useGameStore from '@/store/gameStore';
import useMatchStore from '@/store/matchStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const domParent = ref<HTMLDivElement>();
const domCanvas = ref<HTMLCanvasElement>();

const gameStore = useGameStore();
const cacheStore = useCacheStore();
const route = useRoute();

async function prepare(options: {
  mode: 'single' | 'multi' | 'record' | 'watch';
  initData: any;
}) {
  try {
    const idGame = +route.meta.id!;
    await cacheStore.getGames;
    gameStore.createGame(cacheStore.getGame(idGame).title, domParent.value!, domCanvas.value!);
    gameStore.game!.prepare(options).start();
  }
  catch(e) {
    window._alert('danger', '预期外的错误，请报Bug：0001');
  }
}

useBindEvent(['start single game', 'start multi game'], (data: any) => {
  if (!data.error) {
    prepare(data);
  }
});

useBindEvent('set step truly', (data: any) => {
  const step = data.step;
  gameStore.game!.parseAndAct(step);
});

const matchStore = useMatchStore();

useBindEvent('allow to control', () => {
  matchStore.server!.sendMessage('start game', {});
});

useBindEvent('start game', () => {
  window._alert('warning', '游戏开始');
});

onMounted(async () => {
  const record = gameStore.record;
  if (record) {
    prepare({
      mode: 'record',
      initData: record.initData,
    });
  }
});

useBindEvent('get current', async (data: any) => {
  if (!data) {
    window._alert('danger', '比赛已结束');
    return ;
  }
  await prepare({
    mode: 'watch',
    initData: data.initData,
  });
  data.steps.forEach((step: string) => {
    gameStore.game!.parseAndAct(step);
  });
});
</script>

<template>
  <div class="game-screen">
    <div ref="domParent" class="parent">
      <canvas ref="domCanvas" class="canvas" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
