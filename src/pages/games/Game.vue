<template>
  <div class="min-w-[1600px] w-screen h-screen bg-purple-300 flex justify-center items-center">
    <div class="grid grid-cols-7 w-4/5 h-5/6 gap-3">
      <!-- left -->
      <LeftSubPage :promise_server="promise_server" />
      <!-- middle -->
      <div class="col-span-3 flex justify-center bg-purple-700 rounded-3xl p-3 shadow-xl overflow-scroll">
        <MiddleSubPage :game="(route.params.game as string)" :promise_server="promise_server" />
      </div>
      <!-- right -->
      <div class="col-span-2 bg-purple-500 rounded-3xl shadow-2xl flex flex-col justify-between px-3">
        <SnakeRightSubPage v-if="(route.params.game as string) === 'snake'" :promise_server="promise_server" />
        <ReversiRightSubPage v-else-if="(route.params.game as string) === 'reversi'" :promise_server="promise_server" />
        <BackgammonRightSubPage v-else-if="(route.params.game as string) === 'backgammon'" :promise_server="promise_server" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/userStore';
import GameWebSocket from '@/utils/GameWebSocket';
import { onMounted, onUnmounted, ref } from 'vue';
import LeftSubPage from './LeftSubPage.vue';
import MiddleSubPage from "./MiddleSubPage.vue";
import SnakeRightSubPage from './SnakeRightSubPage.vue';
import { ws_url, mode } from "@/config.json";
import { useRoute } from 'vue-router';
import ReversiRightSubPage from './ReversiRightSubPage.vue';
import BackgammonRightSubPage from './BackgammonRightSubPage.vue';

const userStore = useUserStore();
const route = useRoute();

const server = ref<GameWebSocket>();
const promise_server = ref<Promise<GameWebSocket>>(new Promise((resolve) => {
  const game = route.params.game;
  userStore.addAfterLoginCallback("connect to ws", () => {
    server.value = new GameWebSocket(`${ws_url[mode]}/${game}/${userStore.token}`);
    resolve(server.value);
  });
}));

onMounted(async () => {
  server.value = await promise_server.value;
  server.value
    .on({
      action: "tell result",
      callback: (data: any) => {
        window._alert("success", `游戏结束：${data.result}`, 10000);
        window._alert("primary", `战败原因：${data.reason}`, 10000);
      }
    })
    .on({
      action: "nothing",
      callback: (data: any) => { }
    })
    .on({
      action: "start game",
      callback: (data: any) => {
        window._alert("warning", "游戏开始");
      }
    })
});

onUnmounted(() => {
  if (!server.value) return;
  userStore.removeAfterLoginCallback("connect to ws");
  server.value.close();
  userStore.removeAfterLoginCallback("get record list");
});
</script>

<style scoped lang="scss">

</style>