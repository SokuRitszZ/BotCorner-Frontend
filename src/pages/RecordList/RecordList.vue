<script setup lang="ts">
import SokuSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue';
import dayjs from 'dayjs';
import useCacheStore, { IGame } from '@/store/cacheStore';
import useTitle from '@/utils/useTitle';
import { onMounted, ref } from 'vue';
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';

const cacheStore = useCacheStore();
const games = ref<IGame[]>([]);
onMounted(async () => {
  games.value = await cacheStore.getGames;
});

useTitle('对战记录 --BotCorner博弈小站');

const testLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    testLoading.value = false;
  }, 2000);
});
</script>

<template>
  <div class="game-record w-full h-full">
    <div class="-container">
      <form>
        <input id="search" class="search" type="text" placeholder="录像编号" />
        <label class="title mt-5">游戏</label>
        <div class="options-for-game">
          <div class="option" v-for="game in games" :key="game.id">
            <input :id="`game-${game.id}`" type="checkbox" />
            <label :for="`game-${game.id}`">{{ game.name }}</label>
          </div>
        </div>
      </form>
    </div>
    <main class="-container record-grid mt-5">
      <SokuSkeleton :is-loading="testLoading">
        <div class="record-card">
          <h1 class="font-bold text-3xl text-center pt-4">盘蛇</h1>
          <div class="avatars">
            <SokuImgSkeleton class="avatar" url="https://sdfsdf.dev/100x100.png" />
            <SokuImgSkeleton class="avatar" url="https://sdfsdf.dev/100x100.png" alt="" />
          </div>
          <div class="time">
            {{ dayjs().format('YYYY-MM-DD hh:mm:ss') }}
          </div>
        </div>
      </SokuSkeleton>
      <SokuSkeleton :is-loading="true"></SokuSkeleton>
      <SokuSkeleton :is-loading="true"></SokuSkeleton>
      <SokuSkeleton :is-loading="true"></SokuSkeleton>
      <SokuSkeleton :is-loading="true"></SokuSkeleton>
      <SokuSkeleton :is-loading="true"></SokuSkeleton>
      <SokuSkeleton :is-loading="true"></SokuSkeleton>
      <SokuSkeleton :is-loading="true"></SokuSkeleton>
      <SokuSkeleton :is-loading="true"></SokuSkeleton>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
