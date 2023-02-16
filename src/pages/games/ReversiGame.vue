<template>
  <div class="h-2/5 w-full flex flex-col-reverse">
    <div class="w-full flex justify-between items-center">
      <img
        class="h-24 rounded-full border-black"
        :class="{
          'border-8':
            gameStore.users.findIndex((user) => user.id === userStore.id) === 0,
        }"
        :src="gameStore.users[0].avatar"
        alt="avatar"
      />
      <div class="relative w-full h-full flex justify-center items-center">
        <div
          class="bg-white rounded-full absolute w-16 top-3 h-16 drop-shadow-2xl"
        ></div>
        <div class="bg-black rounded-full absolute top-2 w-16 h-16"></div>
      </div>
      <div class="text-5xl text-black">
        {{ cnt[0] }}
      </div>
    </div>
    <div
      class="my-2 max-h-[150px] overflow-scroll flex flex-wrap justify-start gap-1"
    ></div>
  </div>
  <div class="font-bold text-4xl h-1/5 flex justify-center gap-10 items-center">
    <div class="h-full flex items-center">TURN:</div>
    <div class="flex items-center">
      <div v-if="turn === 0" class="relative">
        <div
          class="bg-white rounded-full relative w-16 top-1 h-16 drop-shadow-2xl"
        ></div>
        <div class="bg-black rounded-full absolute top-0 w-16 h-16"></div>
      </div>
      <div v-else-if="turn === 1" class="relative">
        <div
          class="bg-black rounded-full relative w-16 top-1 h-16 drop-shadow-2xl shadow-white"
        ></div>
        <div class="bg-white rounded-full absolute w-16 top-0 h-16"></div>
      </div>
    </div>
  </div>
  <div class="h-2/5 w-full flex flex-col">
    <div class="w-full flex justify-between items-center">
      <img
        class="h-24 rounded-full border-white"
        :class="{
          'border-4':
            gameStore.users.findIndex((user) => user.id === userStore.id) === 1,
        }"
        :src="gameStore.users[1].avatar"
        alt="avatar"
      />
      <div class="relative w-full h-full flex justify-center items-center">
        <div
          class="bg-black rounded-full absolute w-16 top-3 h-16 drop-shadow-2xl shadow-white"
        ></div>
        <div class="bg-white rounded-full absolute w-16 top-2 h-16"></div>
      </div>
      <div class="text-5xl text-white">
        {{ cnt[1] }}
      </div>
    </div>
    <div
      class="my-2 max-h-[150px] overflow-scroll text-xl flex gap-1 justify-start flex-wrap"
    ></div>
  </div>
</template>

<script setup lang="ts">
import useGameStore from "@/store/gameStore";
import useUserStore from "@/store/userStore";
import GameWebSocket from "@/utils/GameWebSocket";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const gameStore = useGameStore();
const cnt = ref<number[]>([0, 0]);
const turn = ref<number>(-1);

type PropsType = {
  promise_server: Promise<GameWebSocket>;
};

const props = defineProps<PropsType>();

onMounted(async () => {
  const server = await props.promise_server;
  gameStore
    .on("prepare", () => {
      turn.value = -1;
      cnt.value = [0, 0];
    })
    .on("click", (data: any) => {
      if (gameStore.game!.mode === "single") {
        server.sendMessage({
          action: "set step",
          data,
        });
      } else if (gameStore.game!.mode === "multi") {
        server.sendMessage({
          action: "set step",
          data: {
            ...data,
            id: gameStore.users.findIndex((user) => user.id === userStore.id),
          },
        });
      }
    })
    .on("put chess", (data) => {
      cnt.value = data.cnt;
      turn.value = data.id ^ 1;
    })
    .on("pass", (id) => {
      window._alert("primary", `${id ? "白子" : "黑子"}跳过`);
      turn.value = id;
    });
});
</script>

<style scoped lang="scss"></style>
