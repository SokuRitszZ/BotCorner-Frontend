<script setup lang="ts">
import { onMounted, ref } from 'vue';

import useCacheStore, { IBot } from '@/store/cacheStore';
import dayjs from 'dayjs';
import BotDetailModal from './BotDetailModal/BotDetailModal.vue';
import { useRoute } from 'vue-router';
import { getOthersBotsApi } from '@/api/bots';

const cacheStore = useCacheStore();

const route = useRoute();
const id = +route.params.id;

const bots = ref<(IBot & { isMarked: boolean })[]>([]);

onMounted(async () => {
  await cacheStore.getLangs;
  await cacheStore.getGames;
  try {
    const list = ((await getOthersBotsApi(id)) as any).bots;
    (list as (IBot & { isMarked: boolean })[]).sort(
      (a, b) => +new Date(b.modifyTime) - +new Date(a.modifyTime)
    );
    bots.value = (list as (IBot & { isMarked: boolean })[]).sort(
      (a, b) => +a.modifyTime - +b.modifyTime
    );
  } catch (e) {
    window._alert('danger', e as string);
  }
});

const modalModifyBot = ref();
const botSelected = ref<IBot>();
function toModifyBot(bot: IBot) {
  botSelected.value = bot;
  modalModifyBot.value!.show();
}
</script>

<template>
  <div class="w-full">
    <BotDetailModal :bot="botSelected" ref="modalModifyBot" />
    <div v-if="!!bots.length" class="bot-list">
      <button
        @click="toModifyBot(bot)"
        class="bot"
        v-for="bot in bots"
        :key="bot.id"
      >
        <h1 class="title">
          {{ bot.title }}
        </h1>
        <div class="game-and-lang">
          <div class="game">{{ cacheStore.getGame(bot.gameId).name }}</div>
          <div class="lang">{{ cacheStore.getLang(bot.langId) }}</div>
        </div>
        <div class="time">
          {{ dayjs(bot.modifyTime).format('YYYY-MM-DD hh:mm:ss') }}
        </div>
      </button>
    </div>
    <div class="w-full" v-else>
      <h1 class="text-4xl font-thin text-center">该用户未有作品</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('./style.scss');
</style>
