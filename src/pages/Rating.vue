<template>
  <div class="w-full h-full bg-purple-500 pt-24">
    <!-- nav -->
    <nav class="flex justify-center gap-2 px-2 py-2 text-xl text-gray-50 opacity-80 bg-gray-800 m-auto w-fit rounded-full">
      <div @click="setSelectedGame(game)" :class="{ 'bg-purple-600': selectedGame === game }"
        class="transition rounded-full cursor-pointer px-2 py-1 hover:bg-purple-500" v-for="game in games" :key="game.title">{{ game.name }}</div>
    </nav>
    <div class="m-auto w-fit">
      <div v-for="(rating, index) in ratings" :class="{
          'bg-yellow-300 shadow-2xl shadow-yellow-300': index === 0,
          'bg-slate-200 shadow-2xl shadow-slate-200': index === 1,
          'bg-yellow-600 shadow-2xl shadow-yellow-700': index === 2,
          }"
        class="flex justify-between items-center rounded-full w-[600px] bg-purple-600 mt-3 shadow-xl p-2 pr-4 hover:-translate-y-1 transition">
        <img class="w-10 h-10 rounded-full" :src="rating.headIcon" alt="avatar">
        <div class="text-xl" :class="{
          'text-white': index === 0, 
          'text-gray-200': index > 2,
          'text-black': index === 1,
          }">{{ rating.username }}</div>
        <div class="text-xl">{{ rating.rating }}</div>
      </div>
    </div>
    <div class="m-auto w-fit">
      <div class="flex justify-between items-center rounded-full w-[600px] bg-blue-200 mt-3 shadow-xl p-2 pr-4 hover:-translate-y-1 transition">
        <img class="w-10 h-10 rounded-full" :src="faker.image.animals()" alt="avatar">
        <div class="text-xl text-gray-900">{{ faker.name.fullName() }}</div>
        <div class="text-xl">{{ Math.floor(Math.random() * 10000) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import useCacheStore, { IGame, IRating } from '@/store/cache';
import { faker } from '@faker-js/faker';
import { onMounted, ref } from 'vue';

const cacheStore = useCacheStore();
const games = ref<IGame[]>([]);

onMounted(() => {
  cacheStore.getGames()
    .then(list => games.value = list);
})

const ratings = ref<IRating[]>([]);

const selectedGame = ref<IGame>();

const setSelectedGame = (game: IGame) => {
  if (selectedGame.value === game) return;
  selectedGame.value = game;
  cacheStore.getRatings(game.title)
    .then(list => {
      ratings.value = (list as IRating[]);
    });
};

</script>

<style scoped lang="scss">
</style>