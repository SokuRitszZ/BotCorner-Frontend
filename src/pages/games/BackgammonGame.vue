<script setup lang="ts">
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import useGameStore from '@/store/gameStore';
import useMatchStore from '@/store/matchStore';
import useUserStore from '@/store/userStore';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const gameStore = useGameStore();
const turn = ref<number>(-1);
const flag = ['白方', '红方'];

const matchStore = useMatchStore();

onMounted(async () => {
  gameStore.clearEvents();
  const server = matchStore.server!;

  gameStore.on('prepare', (options: { initData: any }) => {
    const { initData } = options;
    window._alert('primary', `${flag[initData.start]}先手`, 5000);
    turn.value = initData.start;
  });
  gameStore.on('choose', (data: any) => {
    if (gameStore.game!.mode === 'single') {
      server.sendMessage('set step', data);
    } else if (gameStore.game!.mode === 'multi') {
      server.sendMessage('set step', {
        ...data,
        id: matchStore.getIndex(userStore.id),
      });
    }
  });
  gameStore.on('turn', (id: number) => {
    turn.value = id;
  });
  gameStore.on('pass', (id: number) => {
    window._alert('primary', `${flag[1 ^ id]}跳过`);
    turn.value = id;
  });
});
</script>

<template>
  <div class="h-fit w-full flex justify-around relative">
    <div v-for="i in 2" :key="i" class="flex flex-col items-center gap-2">
      <span
        class="text-4xl font-bold"
        :class="[(i - 1 && 'text-[#800]') || 'text-[#ccc]']"
        >{{ flag[i - 1] }}</span
      >
      <SokuImgSkeleton
        class="w-[100px] h-[100px]"
        :url="matchStore.usersMatch[i - 1].avatar"
      />
      <span class="text-xl font-thin">{{
        matchStore.usersMatch[i - 1].username
      }}</span>
    </div>
    <div
      class="text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
      :class="[(turn && 'text-[#800]') || 'text-[#ccc]']"
    >
      {{ flag[turn] }}
    </div>
    <!-- <div class="w-full flex justify-between items-center">
      <img
        class="h-24 rounded-full border-[#ccc]"
        :class="isMe(0) && 'border-8'"
        :src="gameStore.users[0].avatar"
        alt="avatar"
      />
      <div class="text-5xl text-[#ccc] font-bold">白方</div>
    </div>
  </div>
  <div class="h-fit w-full mt-5">
    <div class="w-full flex justify-between items-center">
      <img
        class="h-24 rounded-full border-[#800]"
        :class="isMe(1) && 'border-8'"
        :src="gameStore.users[1].avatar"
        alt="avatar"
      />
      <div class="text-5xl text-[#800] font-bold">红方</div>
    </div>
  </div>
  <div class="mt-5 w-full flex justify-between items-center">
    <div class="font-bold text-5xl h-fit">TURN:</div>
    <div v-if="turn === 0" class="text-5xl text-[#ccc] font-bold">白方</div>
    <div v-else-if="turn === 1" class="text-5xl text-[#800] font-bold">
      红方
    </div> -->
  </div>
</template>

<style scoped lang="scss"></style>
