<template>
  <div class="h-2/5 w-full flex flex-col-reverse">
    <div class="w-full flex justify-between items-center">
      <img class="h-24 rounded-full border-red-500" :class="{'border-4': userData.findIndex(user => user.id === userStore.id) === 0}" :src="userData[0].headIcon" alt="avatar">
    </div>
    <div class="my-2 max-h-[150px] overflow-scroll flex flex-wrap justify-start gap-1">
    </div>
  </div>
  <div class="font-bold text-4xl h-1/5 flex justify-center gap-10 items-center">
    <div class="h-full flex items-center">
    </div>
    <div class="flex items-center">
    </div>
  </div>
  <div class="h-2/5 w-full flex flex-col">
    <div class="w-full flex justify-between items-center">
      <img class="h-24 rounded-full border-blue-500" :class="{'border-4': userData.findIndex(user => user.id === userStore.id) === 1}" :src="userData[1].headIcon" alt="avatar">
    </div>
    <div class="my-2 max-h-[150px] overflow-scroll text-xl flex gap-1 justify-start flex-wrap">
    </div>
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
    .on("prepare", () => {
      turn.value = -1;
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
            id: userData.value.findIndex(user => user.id === userStore.id),
          }
        });
      }
    })
});
</script>

<style scoped lang="scss">

</style>