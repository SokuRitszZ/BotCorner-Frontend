<template>
  <div class="lg:normal h-screen w-screen bg-purple-500 overflow-auto flex flex-col justify-start">
    <div class="text-center mb-10 relative mx-auto mt-24">
      <div class="w-fit flex">
        <input placeholder="此功能未开放" type="text" class="w-96 h-10 rounded-lg shadow-xl hover:shadow-2xl p-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="60%" fill="currentColor"
          class="bi bi-search absolute z-10 top-2 right-2 items-center text-purple-800 cursor-pointer" viewBox="0 0 16 16">
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>
    </div>
    <!-- card container -->
    <div class="grid lg:grid-cols-3 grid-cols-1">
      <div v-for="game in games"
        class="w-96 h-[120px] text-2xl mt-4 p-4 bg-gray-100 rounded-3xl m-auto shadow-2xl shrink-0 hover:-translate-y-3 cursor-pointer transition select-none">
        <h1 class="font-semibold text-purple-500">{{ game.name }}</h1>
        <div class="h-14 overflow-scroll">
          <p>{{ game.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCacheStore, { IGame } from '@/store/cache';
import { onMounted, ref } from 'vue';

const games = ref<IGame[]>([]);
const cacheStore = useCacheStore();

onMounted(() => {
  cacheStore.getGames()
    .then(list => games.value = list);
});

</script>

<style scoped lang="scss">
.normal {
  @apply 
  w-screen h-screen;
}
</style>