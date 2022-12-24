<template>
  <div class="lg:normal h-screen w-screen bg-purple-500 overflow-auto flex flex-col justify-start">
    <!-- card container -->
    <Slider ref="$slider" class="w-[500px] h-[600px] m-auto overflow-hidden shadow-inner shadow-purple-500" />
    <div class="text-center mb-10 relative mx-auto">
      <nav class="bg-gray-700 opacity-60 flex justify-between gap-3 p-3 rounded-full">
        <div @click="$slider.slideTo(index)" v-for="(game, index) in games" :class="{'selected': index === $slider.ptr }"
          class="hover:bg-purple-600 p-2 rounded-full text-2xl cursor-pointer transition">
          {{ game.name }}
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import Slider from '@/components/Slider.vue';
import useCacheStore, { IGame } from '@/store/cacheStore';
import { onMounted, ref } from 'vue';

const games = ref<IGame[]>([]);
const cacheStore = useCacheStore();
const $slider = ref();

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

.selected {
  @apply bg-purple-600 text-white;
}
</style>