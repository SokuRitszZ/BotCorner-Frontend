<script setup lang="ts">
import { getCurrentApi } from '@/api/record';
import SokuSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue';
import useCacheStore from '@/store/cacheStore';
import { onMounted, ref } from 'vue';

const cacheStore = useCacheStore();

const records = ref<any[]>([]);

onMounted(async () => {
  await cacheStore.getGames;
  const result = await getCurrentApi();
  records.value = (result as any).results;
});
</script>

<template>
  <div class="game-playing">
    <h2 class="title">正在进行</h2>
    <template v-if="records.length > 0">
      <main class="game-grid">
        <SokuSkeleton class="skeleton" :is-loading="false">
          <div class="card">
            <h1 class="font-bold text-3xl text-center pt-4">盘蛇</h1>
            <div class="avatars">
              <img
                class="avatar"
                src="http://localhost:3000/100x100.png"
                alt=""
              />
              <img
                class="avatar"
                src="http://localhost:3000/100x100.png"
                alt=""
              />
            </div>
          </div>
        </SokuSkeleton>
      </main>
    </template>
    <template v-else>
      <div class="w-full h-full text-5xl font-thin p-4 text-center">目前没有比赛</div>
    </template>
  </div>
</template>
