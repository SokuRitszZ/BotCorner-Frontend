<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import BotDetail from './BotDetail.vue';
import { debounce, throttle } from 'lodash';
import AddBot from './AddBot.vue';
import Icon from '@/components/BootstrapIcon.vue';
import useUserStore from '@/store/userStore';

import leftpad from '@/utils/leftpad';
import useCacheStore, { IBot } from '@/store/cacheStore';
import toWord from '@/utils/toWord';
import { changeVisibleApi, deleteBotApi } from '@/api/bots';
import Select, { IEntry } from '@/components/SokuSelect.vue';

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

const showing = ref<'empty' | 'detail' | 'new'>('empty');
const selectedBot = ref<IBot | null>(null);

const selectBot = throttle((bot: IBot) => {
  if (bot === selectedBot.value && showing.value === 'detail') {
    selectedBot.value = null;
    showing.value = 'empty';
  } else if (showing.value === 'empty') {
    selectedBot.value = bot;
    showing.value = 'detail';
  } else {
    selectedBot.value = bot;
    showing.value = 'empty';
    setTimeout(() => (showing.value = 'detail'), 500);
  }
}, 1000);

const deleteBot = () => {
  deleteBotApi(selectedBot.value!.id)
    .then(() => {
      // success
      showing.value = 'empty';
      bots.value = bots.value.filter((bot) => bot !== selectedBot.value);
      window._alert('success', '删除成功', 2000);
    })
    .catch(() => {
      // fail
      window._alert('danger', '删除失败', 2000);
    });
};

const addBot = (bot: IBot) => {
  bots.value.unshift({ ...bot, isMarked: false });
  showing.value = 'empty';
};

const toAddBot = () => {
  if (showing.value === 'new') showing.value = 'empty';
  else if (showing.value === 'empty') showing.value = 'new';
  else {
    showing.value = 'empty';
    setTimeout(() => (showing.value = 'new'), 500);
  }
};

type IComparer = (l: IBot, r: IBot) => number;

const comparersList = ref<IEntry<IComparer>[]>([
  { key: '名称', value: (l, r) => l.title.localeCompare(r.title) },
  { key: '日期', value: (l, r) => +l.modifyTime - +r.modifyTime },
  { key: '游戏', value: (l, r) => l.gameId - r.gameId },
  { key: '语言', value: (l, r) => l.langId - r.langId },
  { key: '可见', value: (l, r) => (l.visible ? 0 : 1) - (r.visible ? 0 : 1) },
]);

const comparer = ref<IComparer>((l, r) => +l.modifyTime - +r.modifyTime);

watch(comparer, (newF: IComparer) => {
  bots.value.sort((l, r) => newF(l, r));
});
</script>

<template>
  <div class="grid grid-cols-5 min-w-[1600px]">
    <!-- left -->
    <div class="py-24 px-16 col-span-1 h-screen border-r-[1px] border-gray-300">
      <div class="flex gap-4">
        <img
          class="rounded-full w-[50px] h-[50px] ring-2 ring-purple-500"
          :src="(userStore.avatar as string)"
          alt="avatar"
        />
        <div>
          <p class="font-semibold text-purple-500">{{ userStore.username }}</p>
          <p class="font-thin text-gray-400">#{{ leftpad(7, userStore.id) }}</p>
        </div>
      </div>
      <div class="pt-10">
        <button
          @click="toAddBot"
          class="flex justify-center gap-3 items-center bg-purple-600 hover:bg-purple-700 active:bg-purple-800 active:ring-2 focus:ring-2 text-white w-full p-2 rounded-lg font-thin"
        >
          <Icon type="plus" />
          添加新的Bot
        </button>
      </div>
      <div class="pt-10">
        <p class="text-gray-400 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-patch-check inline"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
            />
            <path
              d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"
            />
          </svg>
          正式用户
        </p>
      </div>
    </div>
    <!-- middle -->
    <div
      class="col-span-2 h-screen border-r-[1px] border-gray-300 overflow-scroll"
    >
      <div class="flex justify-between items-center pt-24 pb-3 px-10">
        <div class="text-2xl font-bold">我的Bots</div>
        <div>
          <Select
            class="border-[1px] p-1 px-3"
            :list="comparersList"
            v-model="comparer"
          />
        </div>
      </div>
      <div class="relative flex justify-center px-10 pb-7">
        <input
          placeholder="此功能未开放"
          type="text"
          class="w-full border-[1px] border-gray-200 focus:outline-none focus:ring-purple-400 focus:ring-2 rounded-md p-1"
        />
      </div>
      <hr />
      <TransitionGroup name="bots">
        <div
          @click="selectBot(bot)"
          :key="bot.id"
          v-for="bot in bots"
          :class="{ 'bg-purple-600 text-white': selectedBot === bot }"
          class="select-none bot transition border-b-[1px] px-10 py-4 bg-white hover:bg-purple-600 hover:text-white active:bg-purple-800 cursor-pointer"
        >
          <div class="flex justify-between">
            <div
              :class="{ 'text-purple-600': selectedBot !== bot }"
              class="title font-semibold flex justify-between items-center gap-2"
            >
              <Icon type="bot" :size="24" />
              {{ bot.title }}
            </div>
            <div
              :class="{ 'text-gray-400': selectedBot !== bot }"
              class="font-color rounded-full text-sm h-fit p-1 font-bold flex justify-between gap-3 items-center"
            >
              {{ toWord(cacheStore.getLang(bot.langId)) }}
              <Icon
                v-if="bot.visible"
                @click.stop="toggle(bot.id, false)"
                type="eye"
                :size="24"
              />
              <Icon
                v-else
                @click.stop="toggle(bot.id, true)"
                type="eye-slash"
                :size="24"
              />
            </div>
          </div>
          <div class="flex justify-between">
            <div class="font-color">
              <span class="font-bold text-black">#</span>
              {{ leftpad(8, bot.id) }}
            </div>
            <div class="text-gray-400"></div>
            <div class="flex gap-2">
              <span
                :class="{ 'text-gray-400': selectedBot !== bot }"
                class="font-color"
              >
                Last Modified: {{ bot.modifyTime }} ·
              </span>
              {{ cacheStore.getGame(bot.gameId) }}
              <Icon type="controller" :size="20" />
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <!-- right -->
    <div class="col-span-2 h-screen">
      <Transition>
        <BotDetail
          @delete="deleteBot"
          v-if="showing === 'detail'"
          :bot="selectedBot!"
        />
        <AddBot @add-bot="addBot" v-else-if="showing === 'new'" />
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: 0.5s;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(100%);
}

.v-enter-to,
.v-leave-from {
  transform: translateX(0);
}

.bots-move {
  transition: 0.5s all;
}

.bots-enter-active,
.bots-leave-active {
  transition: 0.5s;
  @apply overflow-hidden h-[89px];
}

.bots-enter-from,
.bots-leave-to {
  @apply max-h-0 py-0;
}

.bots-enter-to,
.bots-leave-from {
  @apply max-h-[89px] py-4;
}

.bots-leave-to {
  @apply bg-red-500;
}

.bots-leave-to * {
  @apply hidden;
}

.bot {
  &:hover {
    .font-color,
    .title {
      @apply text-white;
    }
  }
}
</style>
