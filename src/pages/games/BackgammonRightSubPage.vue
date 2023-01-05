<template>
  <div class="h-fit w-full flex justify-between">
    <div class="w-full flex justify-between items-center">
      <img class="h-24 rounded-full border-[#ccc]" :class="isMe(0) && 'border-8'" :src="userData[0].headIcon" alt="avatar">
      <div class="text-5xl text-[#ccc] font-bold"> 白方 </div>
    </div>
  </div>
  <div class="h-fit w-full mt-5">
    <div class="w-full flex justify-between items-center">
      <img class="h-24 rounded-full border-[#800]" :class="isMe(1) && 'border-8'" :src="userData[1].headIcon" alt="avatar">
      <div class="text-5xl text-[#800] font-bold"> 红方 </div>
    </div>
  </div>
  <div class="mt-5 w-full flex justify-between items-center">
    <div class="font-bold text-5xl h-fit">TURN:</div>
    <div v-if="turn === 0" class="text-5xl text-[#ccc] font-bold"> 白方 </div>
    <div v-else-if="turn === 1" class="text-5xl text-[#800] font-bold"> 红方 </div>
  </div>
</template>

<script setup lang="ts">
import useGameStore from '@/store/gameStore';
import useUserStore, { IUser } from '@/store/userStore';
import GameWebSocket from '@/utils/GameWebSocket';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const gameStore = useGameStore();
const userData = ref<IUser[]>(new Array<IUser>(2).fill({} as IUser).map(x => userStore.$state as IUser));
const cnt = ref<number[]>([0, 0]);
const turn = ref<number>(-1);

type PropsType = {
  promise_server: Promise<GameWebSocket>;
};

const isMe = (id: number) => {
  return id === userData.value.findIndex(user => user.id === userStore.id);
};

const props = defineProps<PropsType>();
onMounted(async () => {
  const server = (await props.promise_server)
    .on({
      action: "make match",
      callback: data => {
        userData.value = data.userData;
      }
    })
  gameStore
    .on("prepare", (options: {initData: any}) => {
      const { initData } = options;
      window._alert("primary", `${initData.start ? '红方' : '白方'}先手`, 5000);
      turn.value = initData.start;
      cnt.value = [0, 0];
    })
    .on("choose", (data: any) => {
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
            id: userData.value.findIndex(user => user.id === userStore.id),
          }
        });
      }
    })
    .on("put chess", (data) => {
      cnt.value = data.cnt;
      turn.value = data.id ^ 1;
    })
    .on("turn", (id) => {
      turn.value = id;
    })
    .on("pass", (id) => {
      window._alert("primary", `${id ? "白方" : "红方"}跳过`);
      turn.value = id;
    });
});
</script>

<style scoped lang="scss">

</style>