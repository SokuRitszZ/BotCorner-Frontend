<template>
  <div class="grid grid-cols-5">
    <!-- left -->
    <div class="py-24 px-16 col-span-1 h-screen border-r-[1px] border-gray-300">
      <div class="flex gap-4">
        <img class="rounded-full w-[50px] h-[50px] ring-2 ring-purple-500" :src="(userStore.headIcon as string)" alt="avatar">
        <div>
          <p class="font-semibold text-purple-500">{{ userStore.username }}</p>
          <p class="font-thin text-gray-400">#{{ leftpad(7, userStore.id) }}</p>
        </div>
      </div>
      <div class="pt-10">
        <button @click="toAddBot"
          class="flex justify-center gap-3 items-center bg-purple-600 hover:bg-purple-700 active:bg-purple-800 active:ring-2 focus:ring-2 text-white w-full p-2 rounded-lg font-thin">
          <Icon type="plus" />
          添加新的Bot
        </button>
      </div>
      <div class="pt-10">
        <p class="text-gray-400 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
            class="bi bi-patch-check inline" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
            <path
              d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
          </svg>
          正式用户
        </p>
      </div>
    </div>
    <!-- middle -->
    <div class="col-span-2 h-screen border-r-[1px] border-gray-300 overflow-scroll">
      <div class="flex justify-between items-center pt-24 pb-3 px-10">
        <div class="text-2xl font-bold">
          我的Bots
        </div>
        <div>
          <Options @change="changeComparor" title="排序" :options="comparors" />
        </div>
      </div>
      <div class="relative flex justify-center px-10 pb-7">
        <input placeholder="此功能未开放" type="text" class="w-full border-[1px] border-gray-200 focus:outline-none focus:ring-purple-400 focus:ring-2 rounded-md p-1">
      </div>
      <hr>
      <TransitionGroup name="bots">
        <div @click="selectBot(bot)" :key="bot.id" v-for="bot in bots"
          class="border-b-[1px] px-10 py-4 hover:bg-gray-100 active:bg-gray-200 cursor-pointer">
          <div class="flex justify-between">
            <div class="font-semibold text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                class="bi bi-robot inline top-0 relative -translate-y-1" viewBox="0 0 16 16">
                <path
                  d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
                <path
                  d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
              </svg>
              {{ bot.title }}
            </div>
            <div class="text-gray-400 rounded-full text-sm h-fit p-1 font-bold">
              {{ toWord(cacheStore.getLang(bot.langId)) }}
              <svg v-if="!bot.isMarked" @click.stop="toggle(bot.id, true)" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="currentColor" class="bi bi-bookmark-star inline" viewBox="0 0 16 16">
                <path
                  d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
                <path
                  d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
              </svg>
              <svg v-else @click.stop="toggle(bot.id, false)" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="currentColor" class="bi bi-bookmark-star-fill inline" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z" />
              </svg>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="text-gray-400">
              <span class="font-bold text-black">#</span>
              {{ leftpad(8, bot.id) }}
            </div>
            <div class="text-gray-400">
            </div>
            <div>
              <span class="text-gray-400">
                Last Modified: {{ bot.modifyTime }} ·
              </span>
              {{ cacheStore.getGame(bot.gameId) }}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                class="bi bi-controller inline" viewBox="0 0 16 16">
                <path
                  d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z" />
                <path
                  d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z" />
              </svg>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <!-- right -->
    <div class="col-span-2 h-screen">
      <Transition>
        <BotDetail @delete="deleteBot" v-if="showing === 'detail'" :bot="selectedBot!" />
        <AddBot @add-bot="addBot" v-else-if="showing === 'new'" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import Options from '@/components/Options/Options.vue';
import { onMounted, ref } from 'vue';
import BotDetail from './BotDetail.vue';
import { throttle } from 'lodash';
import AddBot from './AddBot.vue';
import Icon from '@/components/Icon.vue';
import useUserStore from '@/store/userStore';

import leftpad from "@/utils/leftpad";
import useCacheStore, { IBot } from '@/store/cache';
import toWord from '@/utils/toWord';
import { deleteBotApi } from '@/api/bots';

const userStore = useUserStore();
const cacheStore = useCacheStore();

const bots = ref<(IBot & { isMarked: boolean })[]>([]);

onMounted(() => {
  cacheStore.getLangs();
  cacheStore.getGames();
  cacheStore.getBots()
    .then(list => {
      (list as (IBot & { isMarked: boolean })[]).sort((a, b) => +new Date(b.modifyTime) - +new Date(a.modifyTime));
      bots.value = (list as (IBot & { isMarked: boolean })[]).sort((a, b) => +a.modifyTime - +b.modifyTime);
    });
});

const toggle = (id: number, isMarked: boolean) => {
  bots.value.forEach(bot => bot.id === id && (bot.isMarked = isMarked));
};

const comparors: Array<string> = [ "语言", "游戏", "时间", "名称" ];

const changeComparor = (comparor: String) => {
  switch (comparor) {
    case "语言":
  }
};

const showing = ref<"empty" | "detail" | "new">("empty");
const selectedBot = ref<IBot | null>(null);

const selectBot = throttle((bot: IBot) => {
  if (bot === selectedBot.value && showing.value === "detail") {
    selectedBot.value = null;
    showing.value = "empty";
  } else if (showing.value === "empty") {
    selectedBot.value = bot;
    showing.value = "detail";
  } else {
    selectedBot.value = bot;
    showing.value = "empty";
    setTimeout(() => showing.value = "detail", 500);
  }
}, 1000);

const deleteBot = () => {
  deleteBotApi(selectedBot.value!.id)
    .then(() => {
      // success 
      showing.value = "empty";
      bots.value = bots.value.filter(bot => bot !== selectedBot.value);
      window._alert("success", "删除成功", 2000);
    })
    .catch(() => {
      // fail
      window._alert("danger", "删除失败", 2000);
    });
};

const addBot = (bot: IBot) =>  {
  bots.value.unshift({...bot, isMarked: false});
  showing.value = "empty";
}

const toAddBot = () => {
  if (showing.value === "new") showing.value = "empty";
  else if (showing.value === "empty") showing.value = "new";
  else {
    showing.value = "empty";
    setTimeout(() => showing.value = "new", 500);
  }
};

</script>

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

.bots-enter-active,
.bots-leave-active {
  transition: 0.5s;
  @apply overflow-hidden h-[89px]
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
  @apply bg-red-500
}

.bots-leave-to * {
  @apply hidden;
}

</style>