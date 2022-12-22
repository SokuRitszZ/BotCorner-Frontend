<template>
  <div :class="props.class" class="overflow-hidden">
    <div class="flex justify-start flex-nowrap h-full relative">
      <TransitionGroup>
        <div v-for="(game, idx) in games" :key="game.id" v-show="idx === ptr" class="w-[500px] h-[600px] shrink-0 p-3 absolute left-0 top-0">
          <div @mouseenter="stop" @mouseleave="start" class="cursor-pointer w-full h-full rounded-xl bg-gray-100 p-10 hover:bg-purple-800 hover:text-white transition">
            <h1 class="text-purple-500 text-5xl text-center font-semibold">{{ game.name }}</h1>
            <hr class="my-5">
            <p class="font-medium text-3xl">
              {{ game.description }}
            </p>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCacheStore, { IGame } from '@/store/cacheStore';
import { onMounted, onUnmounted, ref } from 'vue';

type PropsType = {
  class?: string
};
const props = defineProps<PropsType>()
const cacheStore = useCacheStore();

const games = ref<IGame[]>([]);
const ptr = ref<number>(0);
const timer = ref<NodeJS.Timer>();

const next = () => {
  ptr.value = (ptr.value + 1) % games.value.length;
};

const start = () => {
  stop();
  timer.value = setInterval(() => {
    next();
  }, 3000);
};

const stop = () => {
  clearInterval(timer.value);
};

const goto = (index: number) => {
  ptr.value = index;
};

const callback = () => {
  if (document.visibilityState === "hidden") {
    stop();
  } else {
    start();
  }
};

onMounted(() => {
  cacheStore.getGames()
    .then(list => {
      games.value = list;
      start();
    });
  document.addEventListener("visibilitychange", callback)
});

onUnmounted(() => {
  document.removeEventListener("visibilitychange", callback)
});

</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: 1s;
}

.v-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.v-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.v-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.v-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

</style>