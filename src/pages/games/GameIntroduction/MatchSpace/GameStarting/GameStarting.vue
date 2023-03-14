<script setup lang="ts">
import SokuSpinner from '@/components/SokuComponent/SokuSpinner/SokuSpinner.vue';
import useBindEvent from '@/hooks/useBindEvent';
import useMatchStore from '@/store/matchStore';

const matchStore = useMatchStore();

useBindEvent('start single game', (data: any) => {
  if (data.error) {
    window._alert('danger', data.error);
  }
  matchStore.status = 'to-match';
});
</script>

<template>
  <div class="game-starting">
    <h1 class="text-4xl font-thin">游戏即将开始....</h1>
    <SokuSpinner class="spinner" />
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
