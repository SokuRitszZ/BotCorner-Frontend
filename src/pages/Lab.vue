<script setup lang="ts">
import useGameStore from '@/store/gameStore';
import { onMounted, ref } from 'vue';

const $parent = ref();
const $canvas = ref();
const gameStore = useGameStore();

const prepare = (options: {
  mode: "single" | "multi" | "record",
  initData: any;
}) => {
  if ($canvas.value) $canvas.value.remove();
  $canvas.value = document.createElement("canvas");
  $parent.value.append($canvas.value);
  gameStore.createGame("hex", $parent.value, $canvas.value);
  gameStore.game
    ?.prepare({
      mode: options.mode,
      initData: options.initData,
    })
    .start();
};

onMounted(() => {
  prepare({
    mode: 'single',
    initData: undefined
  });
});
</script>

<template>
  <div class="mt-24 h-full">
    <div ref="$parent" class="bg-black m-auto w-2/3 h-3/4">
      <canvas ref="$canvas"></canvas>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>