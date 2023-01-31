<template>
  <div class="w-full">
    <div class="w-full flex justify-between items-center">
      <img class="h-24 rounded-full border-black" :class="isMe(0) && 'border-8'" :src="gameStore.users[0].avatar" alt="avatar">
      <div class="text-black font-bold text-5xl">黑子</div>
    </div>
  </div>
  <div class="w-full mt-5">
    <div class="w-full flex justify-between items-center">
      <img class="h-24 rounded-full border-white" :class="isMe(1) && 'border-8'" :src="gameStore.users[1].avatar" alt="avatar">
      <div class="text-white font-bold text-5xl">白子</div>
    </div>
  </div>
  <div class="mt-5 flex justify-between items-center">
    <div class="font-bold text-5xl text-gray-400">
      TURN:
    </div>
    <div v-if="turn === 0" class="text-black font-bold text-5xl">黑子</div>
    <div v-else-if="turn === 1" class="text-white font-bold text-5xl">白子</div>
  </div>
</template>

<script setup lang="ts">
import useGameStore from '@/store/gameStore';
import useUserStore from '@/store/userStore';
import GameWebSocket from '@/utils/GameWebSocket';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const gameStore = useGameStore();
const cnt = ref<number[]>([0, 0]);
const turn = ref<number>(-1);

type PropsType = {
  promise_server: Promise<GameWebSocket>;
};
const props = defineProps<PropsType>();

const isMe = (id: number) => {
  return gameStore.users.findIndex(user => user.id === userStore.id) === id;
};

onMounted(async () => {
  const server = (await props.promise_server)
    .on({
      action: "set step truly",
      callback: data => {
        turn.value ^= 1;
      }
    })
  gameStore
    .on("prepare", () => {
      turn.value = 0;
      cnt.value = [0, 0];
    })
    .on("click", (data: any) => {
      if (gameStore.game!.mode === "single") {
        server.sendMessage({
          action: "set step",
          data
        });
      } else if (gameStore.game!.mode === "multi") {
        server.sendMessage({
          action: "set step",
          data: {
            ...data,
            id: gameStore.users.findIndex(user => user.id === userStore.id),
          }
        });
      }
    })
});
</script>

<style scoped lang="scss">

</style>