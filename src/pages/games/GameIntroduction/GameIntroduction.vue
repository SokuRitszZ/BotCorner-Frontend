<script setup lang="ts">
import SokuSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue';
import useCacheStore, { IGame } from '@/store/cacheStore';
import useMatchStore from '@/store/matchStore';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MatchSpace from "./MatchSpace/MatchSpace.vue";
import OnlineUsers from './OnlineUsers/OnlineUsers.vue';

const cacheStore = useCacheStore();

const game = ref<IGame>({
  title: '获取中...',
  description: '获取中...',
  name: '获取中...',
  id: 0,
});
const route = useRoute();
const isConnected = ref<boolean>(false);

onMounted(async () => {
  await cacheStore.getGames;
  game.value = cacheStore.games[+route.params.id - 1] || {
    name: '不存在此游戏!',
    description: '不存在此游戏!',
    title: 'not-found',
    id: -1,
  };
  if (game.value.id !== -1) {
    connect();
  }
});

async function connect() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  isConnected.value = true;
}

const matchStore = useMatchStore();
onUnmounted(() => {
  matchStore.status = 'to-match';
});

</script>

<template>
  <div class="game-intro">
    <div class="-container">
      <div class="background">
        <h2 class="text-7xl font-thin">{{ game.name }}</h2>
      </div>
      <main class="show-board">
        <h1 class="title">游戏介绍</h1>
        <hr />
        <main>{{ game.description }}</main>
        <h1 class="title">玩法说明</h1>
        <hr />
        <main>
          详见
          <a
            href="https://www.yuque.com/sokuritszz/upyv68?#%20%E3%80%8A%E5%BC%80%E6%94%BE%E6%96%87%E6%A1%A3%E3%80%8B"
            target="_blank"
            >[语雀]开放文档</a
          >
        </main>
        <h1 class="title ">
          在线状况
          <span v-if="!isConnected" class="text-xl text-red-800">未连接</span>
        </h1>
        <hr />
        <main class="online-state">
          <SokuSkeleton class="match-space" :is-loading="!isConnected">
            <MatchSpace />
          </SokuSkeleton>
          <SokuSkeleton class="online-user" :is-loading="!isConnected">
            <OnlineUsers />
          </SokuSkeleton>
        </main>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>

