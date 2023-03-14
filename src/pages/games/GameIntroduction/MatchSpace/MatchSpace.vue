<script setup lang="ts">
import useMatchStore from '@/store/matchStore';

import ToMatch from './ToMatch/ToMatch.vue';
import MatchingView from './MatchingView/MatchingView.vue';
import MatchedView from './MatchedView/MatchedView.vue';
import GameStarting from './GameStarting/GameStarting.vue';

const matchStore = useMatchStore();
</script>

<template>
  <div class="match-space">
    <ToMatch v-if="matchStore.status === 'to-match'" />
    <MatchingView v-else-if="matchStore.status === 'matching'" />
    <MatchedView v-else-if="matchStore.status === 'matched'" />
    <GameStarting v-else-if="matchStore.status === 'game-starting'" />
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
