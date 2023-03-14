<script setup lang="ts">
import { getCurrentApi } from '@/api/record';
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import SokuSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue';
import useCacheStore, { IBot, IUser } from '@/store/cacheStore';
import { onMounted, ref } from 'vue';

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
</script>

<template>
  <div class="game-playing">
    <h2 class="title">正在进行</h2>
    <template v-if="records.length > 0">
      <main class="game-grid">
        <SokuSkeleton v-for="record in records" :key="record.uuid" class="skeleton" :is-loading="false">
          <div class="card">
            <h1 class="font-bold text-3xl text-center pt-4">盘蛇</h1>
            <div class="avatars">
              <SokuImgSkeleton
                v-for="u in record.users"
                :key="u.id"
                class="avatar"
                :url="u.avatar"
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
