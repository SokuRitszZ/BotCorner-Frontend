<script setup lang="ts">
import SokuModal from '@/components/SokuComponent/SokuModal/SokuModal.vue';

import { addBotApi } from '@/api/bots';
import useCacheStore, { IGame, ILang } from '@/store/cacheStore';
import toWord from '@/utils/toWord';
import { onMounted, ref } from 'vue';

const cacheStore = useCacheStore();

const games = ref<IGame[]>([]);
const langs = ref<ILang[]>([]);

onMounted(async () => {
  games.value = await cacheStore.getGames;
  langs.value = await cacheStore.getLangs;
});

const payload = ref<{
  title: string;
  description?: string;
  idGameSelected: number;
  idLangSelected: number;
  code: string;
}>({
  title: '',
  description: '',
  idGameSelected: 0,
  idLangSelected: 0,
  code: '',
});
const textareaCode = ref();
const statusSubmit = ref<'to submit' | 'submitting'>('to submit');

const changeLang = () => {};

const emit = defineEmits(['addBot']);

async function submit() {
  try {
    statusSubmit.value = 'submitting';
    const result = await addBotApi({
      ...payload.value,
      gameId: payload.value.idGameSelected,
      langId: payload.value.idLangSelected,
    })
    const newBot = { ...payload.value, ...result };
    window._alert('success', `添加${payload.value.title}成功`);
    emit('addBot', newBot);
  } 
  catch (e) {
    window._alert('danger', `添加失败：${e}`);
  }
  finally {
    statusSubmit.value = 'to submit';
  }
}

const modal = ref();

function show() {
  modal.value!.show();
}

defineExpose({
  show,
});
</script>

<template>
  <SokuModal class="modal w-[500px]" ref="modal" title="添加代码">
    <div class="view-box">
      <div>
        <p class="title">名称</p>
        <input
          v-model="payload.title"
          class="mt-1 w-full p-1 border-[1px] rounded-lg px-2"
          type="text"
        />
      </div>
      <div class="label-pair">
        <p class="title">描述</p>
        <textarea
          v-model="payload.description"
          name="description"
          id="description"
          class="resize-none w-full h-52 mt-1 border-[1px] rounded-lg p-2"
        >
        </textarea>
      </div>
      <div class="label-pair">
        <p class="title">游戏</p>
        <div class="flex flex-wrap mt-2 gap-2">
          <div class="mt-2" v-for="game in games" :key="game.id">
            <input
              v-model="payload.idGameSelected"
              :value="game.id"
              class="hidden"
              :id="game.title"
              name="game"
              type="radio"
            />
            <label
              class="cursor-pointer border-[1px] p-2 transition rounded-md"
              :for="game.title"
              >{{ toWord(game.title) }}</label
            >
          </div>
        </div>
      </div>
      <div class="label-pair">
        <p class="title">语言</p>
        <div class="flex flex-wrap mt-2 gap-2">
          <div class="mt-2" v-for="lang in langs" :key="lang.id">
            <input
              @change="changeLang"
              v-model="payload.idLangSelected"
              :value="lang.id"
              class="hidden"
              :id="lang.suffix"
              name="lang"
              type="radio"
            />
            <label
              class="cursor-pointer border-[1px] p-2 transition rounded-md"
              :for="lang.suffix"
              >{{ toWord(lang.lang) }}</label
            >
          </div>
        </div>
      </div>
      <div class="label-pair">
        <p class="title relative">代码</p>
        <textarea
          v-model="payload.code"
          ref="textareaCode"
          class="h-fit mt-2 w-full border-[1px] rounded-xl p-3"
        />
      </div>
      <button @click="submit" :disabled="statusSubmit === 'submitting'" class="submit-btn">
        <template v-if="statusSubmit === 'to submit'">提交</template>
        <template v-else>提交中</template>
      </button>
    </div>
  </SokuModal>
</template>

<style scoped lang="scss">
@import url("./style.scss");
</style>
