<script setup lang="ts">
import SokuSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue';
import useBindEvent from '@/hooks/useBindEvent';
import useCacheStore, { IGame } from '@/store/cacheStore';
import useGameStore from '@/store/gameStore';
import useMatchStore from '@/store/matchStore';
import useUserStore from '@/store/userStore';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import BasePage from '../Games/BasePage/GameBasePage.vue';
import MatchSpace from './MatchSpace/MatchSpace.vue';
import OnlineUsers from './OnlineUsers/OnlineUsers.vue';

const cacheStore = useCacheStore();

const game = ref<IGame>({
  title: '获取中...',
  description: '获取中...',
  name: '获取中...',
  id: 0,
});
const route = useRoute();

onMounted(async () => {
  await cacheStore.getGames;
  const id = +route.meta.id!;
  game.value = cacheStore.games[id - 1] || {
    name: '不存在此游戏!',
    description: '不存在此游戏!',
    title: 'not-found',
    id: -1,
  };
});

onUnmounted(() => {
  if (matchStore.server) {
    matchStore.server.close();
  }
});

const userStore = useUserStore();

async function connect() {
  if (game.value.id === -1) return;

  try {
    isRetrying.value = true;
    await cacheStore.getGames;
    matchStore.connect(
      cacheStore.getGame(+route.meta.id!).title,
      userStore.token
    );
  } catch (e) {
    matchStore.server.close();
    window._alert('danger', '连接失败，请重试');
  }
}

const matchStore = useMatchStore();
onUnmounted(() => {
  matchStore.status = 'to-match';
});

const gameStore = useGameStore();
const isPlayingGame = computed(() => !!gameStore.game);

const isConnected = ref(false);
const isRetrying = ref(false);

useBindEvent('open', () => {
  isConnected.value = true;
  isRetrying.value = false;
});

useBindEvent('close', () => {
  isConnected.value = false;
  isRetrying.value = false;
});
</script>

<template>
  <div class="game-intro">
    <div class="-container">
      <div class="background">
        <h2 class="text-7xl font-thin">{{ game.name }}</h2>
      </div>
      <main v-show="!isPlayingGame" class="show-board">
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
        <h1 class="title">
          在线状况
          <span v-if="!isConnected" class="text-xl text-red-800">未连接</span>
          <button
            @click="connect"
            v-if="!isConnected && !isRetrying"
            class="text-lg bg-gray-200 rounded-md ml-2 px-2 font-thin "
          >
            连接
          </button>
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
      <main v-show="isPlayingGame" class="show-board">
        <BasePage />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
