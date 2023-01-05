<script setup lang="ts">
import useGameStore from '@/store/gameStore';
import { onMounted, ref } from 'vue';
import Progress from '@/components/Progress.vue';
import Window from '@/components/SokuWindow.vue';
import ChatRoom from '@/components/ChatRoom.vue';

const $parent = ref();
const $canvas = ref();
const gameStore = useGameStore();
const val = ref<number>(0);
const $window = ref();

onMounted(() => {
  // setInterval(() => {
  //   // val.value++;
  // }, 10);
  if ($window.value) {
    $window.value.open();
  }
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
    <Progress @change="handleChange" v-model="val" :max="200" :width="100" />
    <Window ref="$window"></Window>
    <ChatRoom />
  </div>
</template>

<style scoped lang="scss">
</style>