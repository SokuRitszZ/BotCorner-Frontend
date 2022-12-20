<template>
  <div :class="`pt-24 px-16 h-screen overflow-scroll`">
    <h1 class="text-4xl font-bold relative items-center">
      添加Bot
      <div class="block absolute right-0 top-0 text-xl font-normal">
        <button :disabled="submitStatus === 'submitting'" @click="submit" class="bg-green-700 disabled:bg-green-500 hover:bg-green-800 active:bg-green-900 text-white px-3 py-2 rounded-lg">提交</button>
      </div>
    </h1>
    <hr class="p-3 mt-5">
    <div>
      <p class="font-semibold text-xl">
        名称
      </p>
      <input v-model="title" class="mt-1 w-full p-1 border-[1px] rounded-lg" type="text">
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">描述</p>
      <textarea v-model="description" name="description" id="description" class="resize-none w-full h-52 mt-1 border-[1px] rounded-lg p-2"> </textarea>
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">游戏</p>
      <div class="flex flex-wrap mt-2 gap-2">
        <div class="mt-2" v-for="game in games">
          <input v-model="selectedGame" :value="game" class="hidden" :id="(game as string)" name="game" type="radio">
          <label class="border-[1px] p-2 transition" :for="(game as string)">{{ game }}</label>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">语言</p>
      <div class="flex flex-wrap mt-2 gap-2">
        <div class="mt-2" v-for="lang in langs">
          <input @change="changeLang" v-model="selectedLang" :value="lang" class="hidden" :id="(lang as string)" name="lang" type="radio">
          <label class="border-[1px] p-2 transition" :for="(lang as string)">{{ lang }}</label>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl relative mb-10">
        代码
      <div class="absolute right-0">
      </div>
      </p>
      <MonacoEditor ref="$editor" id="add-bot-code" class="h-screen mt-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MonacoEditor from '@/components/MonacoEditor.vue';
import { faker } from '@faker-js/faker';
import { ref } from 'vue';

const games = ref<string[]>(new Array(10).fill(0).map(x => faker.word.noun()));

const langs = ref<string[]>(new Array(10).fill(0).map(x => faker.word.adjective()));

const title = ref<string>();
const description = ref<string>();
const selectedGame = ref<string>();
const selectedLang = ref<string>();
const $editor = ref();
const submitStatus = ref<"to submit" | "submitting">("to submit");

const changeLang = () => {
  $editor.value.setLang(selectedLang.value);
};

const submit = () => {
  const data = {
    title: title.value,
    description: description.value,
    game: selectedGame.value,
    lang: selectedLang.value,
    code: $editor.value.getContent(),
  };

  submitStatus.value = "submitting";
  setTimeout(() => {
    submitStatus.value = "to submit";
  }, 2000);
  
  console.log(data);
};

</script>

<style scoped lang="scss">
input[type=radio]:checked+label {
  @apply bg-purple-500 text-gray-100 border-[1px] border-purple-500
}
</style>