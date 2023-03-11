<script setup lang="ts">
import GameList from "./GameList.vue";
import GamePlaying from "./GamePlaying.vue";
import GameRecent from "./GameRecent.vue";

</script>

<template>
  <div class="game-lobby w-full h-full">
    <div class="-container">
      <GameList />
      <GamePlaying />
      <GameRecent />
    </div>
  </div>
</template>

<style lang="scss">
@import url('./style.scss');
</style>
