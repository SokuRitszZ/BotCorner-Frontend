<script setup lang="ts">
import { getCurrentApi } from '@/api/record';
import useCacheStore, { IBot } from '@/store/cacheStore';
import { IUser } from '@/store/userStore';
import { throttle } from 'lodash';
import { onMounted, ref } from 'vue';
import PlayingCard from '../games/PlayingCard.vue';

const cacheStore = useCacheStore();

type IRecord = {
  uuid: string;
  bots: (IBot | null)[];
  gameId: number;
  users: IUser[];
};

const records = ref<IRecord[]>([]);

onMounted(async () => {
  await cacheStore.getGames;
  const result = await getCurrentApi();
  records.value = (result as any).results;
});

async function _refresh() {
  records.value = ((await getCurrentApi()) as any).results;
}

const refresh = throttle(_refresh, 1000);
</script>

<template>
  <div class="game-playing">
    <h2 class="title flex items-center justify-between">
      <span>
        正在进行
      </span>
      <button @click="refresh" class="text-sm bg-gray-300 px-2 rounded-sm">
        刷新
      </button>
    </h2>
    <template v-if="records.length > 0">
      <main class="game-grid">
        <PlayingCard v-for="record in records" :key="record.uuid" :record="record" />
      </main>
    </template>
    <template v-else>
      <div class="w-full h-full text-5xl font-thin p-4 text-center">目前没有比赛</div>
    </template>
  </div>
</template>
