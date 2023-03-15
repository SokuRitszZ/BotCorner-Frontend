<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { debounce } from 'lodash';
import Icon from '@/components/BootstrapIcon.vue';
import useUserStore from '@/store/userStore';

import useCacheStore, { IBot } from '@/store/cacheStore';
import { changeVisibleApi, deleteBotApi } from '@/api/bots';
import dayjs from 'dayjs';
import AddBotModal from './AddBotModal/AddBotModal.vue';
import BotDetailModal from './BotDetailModal/BotDetailModal.vue';
import HoldOnDeleteBtn from '@/components/SokuComponent/HoldOnDeleteBtn.vue';

const userStore = useUserStore();
const cacheStore = useCacheStore();

const bots = ref<(IBot & { isMarked: boolean })[]>([]);

onMounted(() => {
  userStore.addAfterLoginCallback('get bot', async () => {
    const list = await cacheStore.getBots;
    (list as (IBot & { isMarked: boolean })[]).sort(
      (a, b) => +new Date(b.modifyTime) - +new Date(a.modifyTime)
    );
    bots.value = (list as (IBot & { isMarked: boolean })[]).sort(
      (a, b) => +a.modifyTime - +b.modifyTime
    );
  });
});

onUnmounted(() => {
  userStore.removeAfterLoginCallback('get bot');
});

const toggle = (id: number, visible: boolean) => {
  bots.value.forEach((bot) => bot.id === id && (bot.visible = visible));
  changeVisible(id, visible);
};

/**
 * 防抖防止大量流量
 */
const changeVisible = debounce((id: number, visible: boolean) => {
  return changeVisibleApi(id, visible);
}, 1000);

const modalAddBot = ref();
function toAddBot() {
  modalAddBot.value!.show();
}

const modalModifyBot = ref();
const botSelected = ref<IBot>();
function toModifyBot(bot: IBot) {
  botSelected.value = bot;
  modalModifyBot.value!.show();
}

function addBot(bot: IBot) {
  cacheStore.bots.unshift(bot);
}

async function deleteBot(id: number) {
  try {
    await deleteBotApi(id);
    bots.value = bots.value.filter(b => b.id !== id);
    cacheStore.bots = bots.value;
    window._alert('success', '删除成功');
  }
  catch(e) {
    window._alert('danger', e as any);
  }
}
</script>

<template>
  <AddBotModal @add-bot="addBot" ref="modalAddBot" />
  <BotDetailModal :bot="botSelected" ref="modalModifyBot" />
  <div class="bot-list">
    <button @click="toAddBot" class="bot">
      <Icon class="w-fit text-gray-400 mx-auto" type="plus" :size="60" />
    </button>
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
      <div class="options">
        <HoldOnDeleteBtn @click="deleteBot(bot.id)" />
        <Icon
          class="w-fit"
          v-if="bot.visible"
          @click.stop="toggle(bot.id, false)"
          type="eye"
          :size="24"
        />
        <Icon
          class="w-fit"
          v-else
          @click.stop="toggle(bot.id, true)"
          type="eye-slash"
          :size="24"
        />
      </div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import url('./style.scss');
</style>
