<script setup lang="ts">
import SokuSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue';
import useCacheStore, { IGame } from '@/store/cacheStore';
import { onMounted, onUnmounted, ref } from 'vue';

const games = ref<IGame[]>([]);
const cacheStore = useCacheStore();

onMounted(() => {
  cacheStore.getGames.then((list) => {
    games.value = list;
    startSliding();
  });
});

const domItemList = ref<HTMLDivElement>();
const timerSliding = ref<any>();

function _prev() {
  games.value.unshift(games.value.pop()!);
}

function _next() {
  games.value.push(games.value.shift()!);
}

function next() {
  clearTimeout(timerSliding.value);
  domItemList.value!.classList.add('animate');
  timerSliding.value = setTimeout(() => {
    domItemList.value!.classList.remove('animate');
    _next();
  }, 7000);
}

function startSliding() {
  const act = () => {
    timerSliding.value = setTimeout(async () => {
      next();
      act();
    }, 10000);
  };
  next();
  act();
}

onUnmounted(() => {
  clearTimeout(timerSliding.value);
});
</script>

<template>
  <div class="game-list">
    <main class="game-list-container">
      <div class="available-list relative">
        <button
          @click="_prev"
          class="absolute p-2 w-[50px] h-[50px] rounded-full opacity-50 bg-black top-[120px] left-2 z-50"
        >
          左
        </button>
        <button
          @click="_next"
          class="absolute p-2 w-[50px] h-[50px] rounded-full opacity-50 bg-black top-[120px] right-2 z-50"
        >
          右
        </button>
        <h2 class="title">可玩游戏</h2>
        <div ref="domItemList" class="item-list">
          <div class="w-[200px] h-[210px] p-5" v-for="it in games" :key="it.id">
            <button class="item">
              <img
                class="rounded-sm"
                src="https://sdfsdf.dev/100x100.png"
                alt=""
              />
              <span class="text-xl mt-1">
                {{ it.name }}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="recommend">
        <h2 class="title">推荐游戏</h2>
        <div class="item">
          <SokuSkeleton
            :is-loading="true"
            class="w-[100px] h-[100px] rounded-sm"
          />
          <SokuSkeleton
            :is-loading="true"
            class="w-[100px] h-[24px] rounded-sm mt-3"
          />
        </div>
      </div>
    </main>
  </div>
</template>