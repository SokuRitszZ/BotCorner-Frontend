<script setup lang="ts">
import { getRecentRecordsApi } from "@/api/record";
import SokuImgSkeleton from "@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue";
import SokuSkeleton from "@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue";
import useCacheStore, { IUser } from "@/store/cacheStore";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";

type IRecord = {
  id: number;
  gameId: number;
  reason: string;
  result: string;
  time: string;
  titles: string[];
  users: IUser[];
};

const records = ref<IRecord[]>([]);
const cacheStore = useCacheStore();

onMounted(async () => {
  try {
    await cacheStore.getGames;
    const result = await getRecentRecordsApi();
    records.value = (result as any).records;
  }
  catch (e) {
    window._alert('danger', '获取录像失败');
  }
});
</script>

<template>
  <div class="game-recent">
    <h2 class="title">最近比赛</h2>
    <main class="game-grid">
      <SokuSkeleton v-for="record in records" :key="record.id" class="skeleton" :is-loading="false">
        <button class="card">
          <h1 class="font-bold text-3xl text-center">{{ cacheStore.getGame(record.gameId) }}</h1>
          <div class="avatars">
            <SokuImgSkeleton class="avatar" :url="record.users[0].avatar" alt="avatar" />
            {{ record.result }}
            <SokuImgSkeleton class="avatar" :url="record.users[1].avatar" alt="avatar" />
          </div>
          <h1 class="text-center">{{ dayjs(record.time).format('YYYY-MM-DD hh:mm:ss') }}</h1>
        </button>
      </SokuSkeleton>
    </main>
  </div>
</template>
