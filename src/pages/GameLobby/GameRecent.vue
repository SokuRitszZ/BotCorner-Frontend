<script setup lang="ts">
import { getRecentRecordsApi } from "@/api/record";
import useCacheStore, { IUser } from "@/store/cacheStore";
import { onMounted, ref } from "vue";
import RecordCard from "../RecordCard/RecordCard.vue";

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
      <RecordCard v-for="record in records" :key="record.id" :record="record" />
    </main>
  </div>
</template>
