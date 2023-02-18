<template>
  <div class="w-full">
    <div class="w-full flex justify-between items-center">
      <img
        class="h-24 rounded-full border-red-700"
        :class="isMe(0) && 'border-8'"
        :src="gameStore.users[0].avatar"
        alt="avatar"
      />
      <div class="text-5xl font-bold text-red-700">红方</div>
    </div>
  </div>
  <div class="w-full mt-5">
    <div class="w-full flex justify-between items-center">
      <img
        class="h-24 rounded-full border-blue-700"
        :class="isMe(1) && 'border-8'"
        :src="gameStore.users[1].avatar"
        alt="avatar"
      />
      <div class="text-5xl font-bold text-blue-700">蓝方</div>
    </div>
  </div>
  <div class="mt-5 flex justify-between items-center">
    <div class="text-5xl font-bold">TURN:</div>
    <div v-if="turn === 0" class="text-5xl font-bold text-red-700">红方</div>
    <div v-else-if="turn === 1" class="text-5xl font-bold text-blue-700">
      蓝方
    </div>
  </div>
</template>

<script setup lang="ts">
import useGameStore from '@/store/gameStore';
import useUserStore from '@/store/userStore';
import GameWebSocket from '@/utils/GameWebSocket';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const gameStore = useGameStore();
const turn = ref<number>(-1);

const isMe = (id: number) => {
  return gameStore.users.findIndex((user) => userStore.id === user.id) === id;
};

type PropsType = {
  promise_server: Promise<GameWebSocket>;
};
const props = defineProps<PropsType>();
onMounted(async () => {
  const server = (await props.promise_server).on({
    action: 'set step truly',
    callback: () => {
      turn.value ^= 1;
    },
  });
  gameStore
    .on('prepare', () => {
      turn.value = 0;
    })
    .on('click', (data: any) => {
      if (gameStore.game!.mode === 'single') {
        server.sendMessage({
          action: 'set step',
          data,
        });
      } else if (gameStore.game!.mode === 'multi') {
        server.sendMessage({
          action: 'set step',
          data: {
            ...data,
            id: gameStore.users.findIndex((user) => user.id === userStore.id),
          },
        });
      }
    });
});
</script>

<style scoped lang="scss"></style>
