<script setup lang="ts">
import useGameStore from '@/store/gameStore';
import { onMounted, ref } from 'vue';
import Progress from '@/components/Progress.vue';

const $parent = ref();
const $canvas = ref();
const gameStore = useGameStore();
const val = ref<number>(0);

onMounted(() => {
  // setInterval(() => {
  //   // val.value++;
  // }, 10);
})


// const prepare = (options: {
//   mode: "single" | "multi" | "record",
//   initData: any;
// }) => {
//   if ($canvas.value) $canvas.value.remove();
//   $canvas.value = document.createElement("canvas");
//   $parent.value.append($canvas.value);
//   gameStore.createGame("gomoku", $parent.value, $canvas.value);
//   gameStore.game
//     ?.prepare({
//       mode: options.mode,
//       initData: options.initData,
//     })
//     .start();
// };

// onMounted(() => {
//   prepare({
//     mode: 'single',
//     initData: undefined
//   });
// });
const handleChange = (data: number) => console.log(data);
</script>

<template>
  <div class="mt-24 h-full text-center">
    <!-- <div ref="$parent" class="bg-black m-auto w-2/3 h-3/4">
      <canvas ref="$canvas"></canvas>
    </div> -->
    <Progress @change="handleChange" v-model="val" :max="200" :width="100" />
  </div>
</template>

<style scoped lang="scss">
</style>