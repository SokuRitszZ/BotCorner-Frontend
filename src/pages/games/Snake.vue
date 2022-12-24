<template>
  <div class="min-w-[1600px] w-screen h-screen bg-purple-300 flex justify-center items-center">
    <div class="grid grid-cols-7 w-4/5 h-5/6 gap-3">
      <!-- left -->
      <LeftSubPage :promise_server="promise_server" />
      <!-- middle -->
      <div class="col-span-3 flex justify-center bg-purple-700 rounded-3xl p-3 shadow-xl">
        <MiddleSubPage :promise_server="promise_server" />
      </div>
      <!-- right -->
      <div class="col-span-2 bg-purple-500 rounded-3xl shadow-2xl flex flex-col justify-between px-3">
        <RightSubPage :promise_server="promise_server" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore, { IUser } from '@/store/userStore';
import GameWebSocket from '@/utils/GameWebSocket';
import { onMounted, onUnmounted, ref } from 'vue';
import LeftSubPage from './LeftSubPage.vue';
import MiddleSubPage from "./MiddleSubPage.vue";
import RightSubPage from './RightSubPage.vue';

const userData = ref<IUser[]>([
  {
    id: 0,
    username: "unknown",
    headIcon: "http://placeimg.com/640/640/fashion"
  },
  {
    id: 1,
    username: "unknown",
    headIcon: "http://placeimg.com/640/640/fashion"
  },
]);

const userStore = useUserStore();

const server = ref<GameWebSocket>();
const promise_server = ref<Promise<GameWebSocket>>(new Promise((resolve) => {
  userStore.addAfterLoginCallback("connect to ws", () => {
    server.value = new GameWebSocket(`ws://localhost:8080/websocket/snake/${userStore.token}`);
    resolve(server.value);
  });
}));

onMounted(async () => {
  server.value = await promise_server.value;
  server.value.addCallback({
    action: "tell result",
    callback: (data: any) => {
      window._alert("success", `游戏结束：${data.result}`, 10000);
      window._alert("primary", `战败原因：${data.reason}`, 10000);
    }
  })
  .addCallback({
    action: "nothing",
    callback: (data: any) => {}
  })
  .addCallback({
    action: "start game",
    callback: (data: any) => {
      window._alert("warning", "游戏开始");
    }
  })
});

onUnmounted(() => {
  if (!server.value) return ;
  userStore.removeAfterLoginCallback("connect to ws");
  server.value.close();
});
</script>

<style scoped lang="scss">

</style>