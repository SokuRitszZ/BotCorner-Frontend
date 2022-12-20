<template>
  <div :class="`pt-24 px-16 h-screen overflow-scroll`" v-if="bot">
    <h1 class="text-4xl font-bold relative items-center">
      详细信息
      <div class="block absolute right-0 top-0 text-xl font-normal">
        <button @click="toDelete(bot!)" class="bg-red-700 hover:bg-red-800 active:bg-red-900 text-white px-3 py-2 rounded-lg">删除</button>
        <Transition name="delete-input">
          <input v-model="deleteInputValue" v-if="isDeleting" class="absolute right-0 p-2 translate-y-[140%] border-[1px] border-red-700 rounded-lg text-sm w-72" type="text" placeholder="输入Bot名称并按下“删除”以确认删除">
        </Transition>
      </div>
    </h1>
    <hr class="p-3 mt-5">
    <div>
      <p class="font-semibold text-xl">
        名称
      </p>
      <input @change="e => changeTitle(e, bot!)" class="mt-1 w-full p-1 border-[1px] rounded-lg" type="text" :value="bot.title">
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">
        编号
      </p>
      <input class="mt-1 w-full p-1 border-[1px] rounded-lg" type="text" :value="bot.id" disabled>
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">描述</p>
      <textarea :value="bot.description" name="description" id="description" class="resize-none w-full h-52 mt-1 border-[1px] rounded-lg p-2">
      </textarea>
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">游戏</p>
      <div class="flex flex-wrap mt-2 gap-2">
        <div class="mt-2" v-for="game in games">
          <input :value="game" class="hidden" :id="(game as string)" name="lang" type="radio" disabled :checked="game === bot.game">
          <label class="border-[1px] p-2 transition" :for="(game as string)">{{ game }}</label>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">语言</p>
      <div class="flex flex-wrap mt-2 gap-2">
        <div class="mt-2" v-for="lang in langs">
          <input :value="lang" class="hidden" :id="(lang as string)" name="lang" type="radio" disabled :checked="lang === bot.lang">
          <label class="border-[1px] p-2 transition" :for="(lang as string)">{{ lang }}</label>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl relative mb-10">
        代码
        <div class="absolute right-0">
          <button @click="getCode" class="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-sm p-2 rounded-lg text-white mr-2">获取代码</button>
          <button :disabled="uploadStatus === 'uploading'" @click="upload" class="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-sm p-2 rounded-lg text-white disabled:bg-purple-300">上传修改</button>
        </div>
      </p>
      <MonacoEditor ref="$editor" id="edit-bot-code" class="h-screen mt-2"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import MonacoEditor from '@/components/MonacoEditor.vue';
import { faker } from '@faker-js/faker';
import { ref } from 'vue';
import { IBot } from './BotsManage.vue';

type PropsType = {
  bot: IBot | undefined,
};

const props = defineProps<PropsType>();

const games = ref<String[]>(new Array(10).fill(0).map(x => faker.word.noun()));

const langs = ref<String[]>(new Array(10).fill(0).map(x => faker.word.adjective()));

const $editor = ref();

const getCode = () => {
  console.log(props.bot?.code);
  $editor.value.setLang(props.bot?.lang);
  $editor.value.setContent(props.bot?.code);
};

const reset = () => {
  $editor.value.setContent("");
};

defineExpose({
  reset
});

const uploadStatus = ref<"to upload" | "uploading">("to upload");

const upload = () => {
  uploadStatus.value = "uploading";
  setTimeout(() => {
    console.log($editor.value.getContent());
    uploadStatus.value = "to upload";
  }, 2000);
};

const changeTitle = (e: Event, bot: IBot) => {
  const dom = e.target;
  const newTitle = (dom as HTMLInputElement).value;
  
  // success
  bot.title = newTitle;

  // fail
};

const emit = defineEmits(['delete']);

const isDeleting = ref<boolean>(false);
const deleteInputValue = ref<string>();

const toDelete = (bot: IBot) => {
  if (!isDeleting.value) isDeleting.value = true;
  else {
    if (deleteInputValue.value === bot.title) {
      // success
      emit('delete');
    } else {
      // fail
      isDeleting.value = false;
    }
  }
};

</script>

<style scoped lang="scss">
input[type=radio]:checked + label {
  @apply bg-purple-500 text-gray-100 border-0
}

.delete-input-enter-active,
.delete-input-leave-active {
  transition: 0.5s;
}

.delete-input-enter-from,
.delete-input-leave-to {
  @apply opacity-0 translate-y-[100%];
}

.delete-input-enter-to,
.delete-input-leave-from {
  @apply opacity-100;
};
</style>