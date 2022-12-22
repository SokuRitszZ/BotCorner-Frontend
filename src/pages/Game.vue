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
    <Slider class="w-[500px] h-[600px] m-auto overflow-hidden shadow-inner shadow-purple-500">
    </Slider>
  </div>
</template>

<script setup lang="ts">
import Slider from '@/components/Slider.vue';
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