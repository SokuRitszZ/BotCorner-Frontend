<template>
  <div class="lg:normal h-screen w-screen bg-purple-500 overflow-auto flex flex-col justify-start">
    <!-- card container -->
    <NewSlider v-model="current" ref="$slider" :width="500" :height="600" class="m-auto"/>
    <!-- <Slider ref="$slider" class="w-[500px] h-[600px] m-auto overflow-hidden shadow-inner shadow-purple-500" /> -->
    <Bar @click="handleClickBar" v-model="current" :list="bar_list" class="w-fit m-auto font-semibold text-xl" />
  </div>
</template>

<script setup lang="ts">
import Bar from '@/components/Bar.vue';
import NewSlider from '@/components/NewSlider.vue';
import useCacheStore, { IGame } from '@/store/cacheStore';
import { onMounted, ref } from 'vue';

const games = ref<IGame[]>([]);
const cacheStore = useCacheStore();
const $slider = ref();
const bar_list = ref<string[]>([]);
const current = ref<number>(0);

onMounted(() => {
  cacheStore.getGames
    .then(list => {
      games.value = list;
      bar_list.value = list.map(x => x.name);
      current.value = Math.floor(Math.random() * list.length);
      start();
    });
});

const timer = ref<NodeJS.Timer>();

function start(): void {
  clearTimeout(timer.value);
  function act() {
    timer.value = setTimeout(() => {
      current.value = (current.value + 1) % games.value.length;
      act();
    }, 3000);
  }
  act();
}

function stop() {
  clearTimeout(timer.value);
}

function handleClickBar() {
  clearTimeout(timer.value);
  start();
}

function autoSlide() {
  document.visibilityState === "hidden" && stop() || start();
}

onMounted(() => {
  document.addEventListener("visibilitychange", autoSlide)
});

</script>

<style scoped lang="scss">
.normal {
  @apply 
  w-screen h-screen;
}

.selected {
  @apply bg-purple-600 text-white;
}
</style>