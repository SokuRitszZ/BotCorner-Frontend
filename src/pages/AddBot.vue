<template>
  <div :class="`pt-24 px-16 h-screen overflow-scroll`">
    <h1 class="text-4xl font-bold relative items-center">
      添加Bot
      <div class="block absolute right-0 top-0 text-xl font-normal">
        <button :disabled="submitStatus === 'submitting'" @click="submit"
          class="bg-green-700 disabled:bg-green-500 hover:bg-green-800 active:bg-green-900 text-white px-3 py-2 rounded-lg">提交</button>
      </div>
    </h1>
    <hr class="p-3 mt-5">
    <div>
      <p class="font-semibold text-xl">
        名称
      </p>
      <input v-model="title" class="mt-1 w-full p-1 border-[1px] rounded-lg px-2" type="text">
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">描述</p>
      <textarea v-model="description" name="description" id="description"
        class="resize-none w-full h-52 mt-1 border-[1px] rounded-lg p-2"> </textarea>
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">游戏</p>
      <div class="flex flex-wrap mt-2 gap-2">
        <div class="mt-2" v-for="game in games" :key="game.id">
          <input v-model="selectedGame" :value="game.id" class="hidden" :id="game.title" name="game" type="radio">
          <label class="cursor-pointer border-[1px] p-2 transition rounded-md" :for="game.title">{{ toWord(game.title) }}</label>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">语言</p>
      <div class="flex flex-wrap mt-2 gap-2">
        <div class="mt-2" v-for="lang in langs" :key="lang.id">
          <input @change="changeLang" v-model="selectedLang" :value="lang.id" class="hidden" :id="lang.suffix" name="lang" type="radio">
          <label class="cursor-pointer border-[1px] p-2 transition rounded-md" :for="lang.suffix">{{ toWord(lang.lang) }}</label>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl relative mb-10">
        代码
      <div class="absolute right-0">
      </div>
      </p>
      <textarea ref="$editor" class="h-screen mt-2 w-full border-[1px] rounded-xl p-3"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addBotApi } from '@/api/bots';
import useCacheStore, { IGame, ILang } from '@/store/cacheStore';
import toWord from '@/utils/toWord';
import { ref } from 'vue';

const cacheStore = useCacheStore();

const games = ref<IGame[]>(cacheStore.games);
const langs = ref<ILang[]>(cacheStore.langs);

const title = ref<string>();
const description = ref<string>();
const selectedGame = ref<number>();
const selectedLang = ref<number>();
const $editor = ref();
const submitStatus = ref<"to submit" | "submitting">("to submit");

const changeLang = () => {
};

const emit = defineEmits(['addBot']);

const submit = () => {
  const data: {
    title: string,
    description: string,
    gameId: number,
    langId: number,
    code: string
  } = {
    title: title.value?.trim() || "",
    description: description.value?.trim() || "",
    gameId: selectedGame.value || 0,
    langId: selectedLang.value || 0,
    code: $editor.value.value.trim(),
  };
  
  submitStatus.value = "submitting";
  addBotApi(data)
    .then((returnData: any) => {
      const newBot = { ...data, ...returnData };
      window._alert("success", `添加${data.title}成功`);
      emit("addBot", newBot);
    })
    .catch(error => {
      window._alert("danger", `添加失败：${error}`);
    })
    .finally(() => {
      submitStatus.value = "to submit";
    });
};

</script>

<style scoped lang="scss">
input[type=radio]:checked+label {
  @apply bg-purple-500 text-gray-100 border-[1px] border-purple-500
}
</style>