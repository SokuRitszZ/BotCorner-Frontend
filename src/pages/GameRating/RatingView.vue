<script setup lang="ts">
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import useCacheStore, { IGame } from '@/store/cacheStore';
import leftpad from '@/utils/leftpad';
import { faker } from '@faker-js/faker';
import { onMounted, ref } from 'vue';

const cacheStore = useCacheStore();

const games = ref<IGame[]>([]);
onMounted(async () => {
  games.value = await cacheStore.getGames;
});
</script>

<template>
   <div class="game-rating w-full h-full">
    <div class="-container">
      <form>
        <input class="search" type="text" placeholder="搜寻用户（id / 模糊名字）">
        <div class="options">
          <div v-for="game in games" :key="game.id">
            <input :id="game.title" :value="game.id" name="game" type="radio">
            <label :for="game.title">{{ game.name }}</label>
          </div>
        </div>
      </form>
    </div>
    <div class="-container rating-list">
      <div class="top-3">
        <div class="medal runner-up">
          <SokuImgSkeleton class="avatar" url="http://sdfsdf.dev/100x100.png,223344,334455" />
          <span>{{ faker.name.fullName() }}</span>
          <span class="text-4xl">{{ Math.random() * 10000 >>> 0 }}</span>
        </div>
        <div class="medal champion">
          <SokuImgSkeleton class="avatar" url="http://sdfsdf.dev/100x100.png,556677,667788" />
          <span>{{ faker.name.fullName() }}</span>
          <span class="text-4xl">{{ Math.random() * 10000 >>> 0 }}</span>
        </div>
        <div class="medal third-place">
          <SokuImgSkeleton class="avatar" url="http://sdfsdf.dev/100x100.png,99aabb,aabbcc" />
          <span>{{ faker.name.fullName() }}</span>
          <span class="text-4xl">{{ Math.random() * 10000 >>> 0 }}</span>
        </div>
      </div>
      <div class="list">
        <div class="user" v-for="i in 14" :key="i">
          <span class="rating">#{{ leftpad(2, i+3) }}</span>
          <SokuImgSkeleton class="avatar" url="https://sdfsdf.dev/100x100.png" />
          <div class="name-and-rating">
            <div class="name">{{ faker.name.fullName() }}</div>
            <div class="rating">{{ Math.random() * 10000 >>> 0 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("./style.scss");
</style>