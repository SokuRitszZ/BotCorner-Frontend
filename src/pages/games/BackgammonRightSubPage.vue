<template>
  <div class="h-2/5 w-full flex flex-col-reverse">
    <div class="w-full flex justify-between items-center">
      <img class="h-24 rounded-full border-[#ccc]" :class="{'border-8': userData.findIndex(user => user.id === userStore.id) === 0}" :src="userData[0].headIcon" alt="avatar">
    </div>
    <div class="my-2 max-h-[150px] overflow-scroll flex flex-wrap justify-start gap-1">
    </div>
  </div>
  <div class="h-2/5 w-full flex flex-col">
    <div class="w-full flex justify-between items-center">
      <img class="h-24 rounded-full border-[#800]" :class="{'border-8': userData.findIndex(user => user.id === userStore.id) === 1}" :src="userData[1].headIcon" alt="avatar">
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
    .on("prepare", (options: {initData: any}) => {
      const { initData } = options;
      window._alert("primary", `${initData.start ? '红方' : '白方'}先手`, 5000);
      turn.value = -1;
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
    .on("pass", (id) => {
      window._alert("primary", `${id ? "白方" : "红方"}跳过`);
      turn.value = id;
    });
});
</script>

<style scoped lang="scss">

</style>