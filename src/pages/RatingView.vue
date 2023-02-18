<script setup lang="ts">
import useCacheStore, { IGame, IRating } from '@/store/cacheStore';
import useUserStore from '@/store/userStore';
import leftpad from '@/utils/leftpad';
import { onMounted, onUnmounted, ref } from 'vue';

const cacheStore = useCacheStore();
const userStore = useUserStore();
const games = ref<IGame[]>([]);
const myRating = ref<IRating>({
  id: 0,
  username: 'NULL',
  avatar: 'https://sdfsdf.dev/500x500.png',
  score: 0,
});

onMounted(() => {
  cacheStore.getGames.then((list) => (games.value = list));
});

onUnmounted(() => {
  userStore.removeAfterLoginCallback('get my rating');
});

const ratings = ref<IRating[]>([]);

const selectedGame = ref<IGame>();

const setSelectedGame = (game: IGame) => {
  if (selectedGame.value === game) return;
  selectedGame.value = game;
  userStore.addAfterLoginCallback('get my rating', () => {
    cacheStore.getMyRating(game.id).then((info) => {
      myRating.value = { ...info, ...userStore };
    });
  });
  cacheStore.getRatings(game.id).then((list) => {
    ratings.value = list as IRating[];
  });
};
</script>

<template>
  <div class="w-screen h-screen bg-purple-500 pt-24">
    <!-- nav -->
    <nav
      class="flex justify-center gap-2 px-2 py-2 text-xl text-gray-50 opacity-80 bg-gray-800 m-auto w-fit rounded-full"
    >
      <div
        @click="setSelectedGame(game)"
        :class="{ 'bg-purple-600': selectedGame === game }"
        class="transition rounded-full cursor-pointer px-2 py-1 hover:bg-purple-500"
        v-for="game in games"
        :key="game.title"
      >
        {{ game.name }}
      </div>
    </nav>
    <div class="w-full h-[70vh] overflow-auto">
      <TransitionGroup>
        <div
          v-for="(rating, index) in ratings"
          :key="rating.id"
          :class="{
            champion: index === 0,
            'second-place': index === 1,
            'third-place': index === 2,
            'other-place': index > 2,
          }"
          class="flex justify-between items-center m-auto rounded-full w-[600px] mt-3 shadow-xl p-2 pr-4 hover:-translate-y-1 transition"
        >
          <div class="flex items-center gap-2">
            <img
              class="w-10 h-10 rounded-full"
              :src="rating.avatar"
              alt="avatar"
            />
            <div class="id text-gray-600">#{{ leftpad(7, rating.id) }}</div>
          </div>
          <div class="text-xl username">{{ rating.username }}</div>
          <div class="text-xl rating">{{ rating.score }}</div>
        </div>
      </TransitionGroup>
      <div class="m-auto w-fit">
        <div
          class="flex justify-between items-center rounded-full w-[600px] bg-blue-200 mt-3 shadow-xl p-2 pr-4 hover:-translate-y-1 transition"
        >
          <img
            class="w-10 h-10 rounded-full"
            :src="myRating.avatar"
            alt="avatar"
          />
          <div class="text-xl text-gray-900">{{ myRating.username }}</div>
          <div class="text-xl">{{ myRating.score }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// http://vue.dragonlm.com/guide/built-ins/transition-group.html#move-transitions
.v-move {
  transition: 0.5s;
}

.v-enter-active,
.v-leave-active {
  transition: 0.5s;
  overflow: hidden;
}

.v-enter-from {
  @apply -translate-x-10 opacity-0;
}

.v-enter-to {
  @apply translate-x-0 opacity-100;
}

.v-leave-from {
  @apply opacity-100 translate-x-0;
}

.v-leave-to {
  @apply opacity-0 translate-x-10;
}

.v-enter-from,
.v-leave-to {
  @apply max-h-0 mt-0 py-0;
}

.v-enter-to,
.v-leave-from {
  @apply max-h-[56px];
}

.champion {
  @apply bg-yellow-400 text-white shadow-yellow-200;
  box-shadow: 0 0 50px;

  .id {
    @apply text-white;
  }
}

.second-place {
  box-shadow: 0 0 100px #f1f5f9;
  @apply bg-slate-200;
}

.third-place {
  box-shadow: 0 0 25px #a16207;
  @apply bg-yellow-600 text-white shadow-yellow-700;

  .id {
    @apply text-slate-300;
  }
}

.other-place {
  @apply text-gray-300 bg-purple-600;
  .id {
    @apply text-gray-400;
  }
}
</style>
