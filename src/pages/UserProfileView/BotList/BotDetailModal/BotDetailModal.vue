<script setup lang="ts">
import SokuModal from '@/components/SokuComponent/SokuModal/SokuModal.vue';
import useCacheStore, { IBot, IGame, ILang } from '@/store/cacheStore';
import leftpad from '@/utils/leftpad';
import { ref } from 'vue';
import toWord from '@/utils/toWord';
import { getCodeApi, updateBotApi } from '@/api/bots';

const cacheStore = useCacheStore();

const games = ref<IGame[]>(cacheStore.games);
const langs = ref<ILang[]>(cacheStore.langs);

const $editor = ref();

const isGettingCode = ref<boolean>(false);

async function getCode() {
  if (!props.bot) return;
  if (props.bot.code) {
    $editor.value.value = props.bot.code;
  } else {
    isGettingCode.value = true;
    try {
      const code = ((await getCodeApi(props.bot.id)) as any).code as string;
      $editor.value.value = code || '';
      // eslint-disable-next-line vue/no-mutating-props
      props.bot.code = code || '';
      window._alert('success', '获取成功');
    } catch (error) {
      window._alert('danger', `获取失败：${error}`);
    }
    isGettingCode.value = false;
  }
}

const statusUpload = ref<'to upload' | 'uploading'>('to upload');

async function changeCode() {
  try {
    statusUpload.value = 'uploading';
    const code = $editor.value.getContent();
    const info = await updateBotApi(props.bot!.id, {
      code: $editor.value.getContent(),
    });
    props.bot!.code = code;
    props.bot!.modifyTime = (info as any).modifyTime;
    window._alert('success', '修改成功');
  } catch (error) {
    window._alert('danger', `修改失败：${error}`);
  } finally {
    statusUpload.value = 'to upload';
  }
}

async function changeTitle(e: Event, bot: IBot) {
  const dom = e.target;
  const newTitle = (dom as HTMLInputElement).value;
  try {
    const info = await updateBotApi(bot.id, {
      title: newTitle,
    });
    bot.title = newTitle;
    bot.modifyTime = (info as any).modifyTime;
    window._alert('success', '修改成功');
  } catch (error) {
    window._alert('danger', `修改失败：${error}`);
  }
}

async function changeDescription(e: Event, bot: IBot) {
  const dom = e.target;
  const newDescription = (dom as HTMLTextAreaElement).value;
  try {
    const info = await updateBotApi(bot.id, {
      description: newDescription,
    });
    bot.description = newDescription;
    bot.modifyTime = (info as any).modifyTime;
    window._alert('success', '修改成功');
  } catch (error) {
    window._alert('danger', `修改失败：${error}`);
  }
}

type PropsType = {
  bot?: IBot;
};
const props = defineProps<PropsType>();

const modal = ref();
function show() {
  modal.value!.show();
}

defineExpose({
  show,
});
</script>

<template>
  <SokuModal ref="modal" title="详细信息" class="modal w-[500px]">
    <div class="view-box" v-if="bot">
      <div>
        <div class="title">名称</div>
        <input
          @change="e => changeTitle(e, bot!)"
          type="text"
          :value="bot.title"
        />
      </div>
      <div class="label-pair">
        <div class="title">编号</div>
        <input type="text" :value="leftpad(8, bot.id)" disabled />
      </div>
      <div class="label-pair">
        <p class="title">描述</p>
        <textarea
          @change="e => changeDescription(e, bot!)"
          :value="bot.description"
          name="description"
          id="description"
          class=""
        >
        </textarea>
      </div>
      <div class="label-pair">
        <p class="title">游戏</p>
        <div class="flex flex-wrap mt-2 gap-2">
          <div class="mt-2" v-for="game in games" :key="game.id">
            <input
              :value="game.id"
              class="hidden"
              :id="(game.title as string)"
              name="game"
              type="radio"
              disabled
              :checked="game.id === bot.gameId"
            />
            <label
              class="border-[1px] p-2 transition rounded-md"
              :for="(game.title as string)"
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
              :value="lang.id"
              class="hidden"
              :id="(lang.lang as string)"
              name="lang"
              type="radio"
              disabled
              :checked="lang.id === bot.langId"
            />
            <label
              class="border-[1px] p-2 transition rounded-md"
              :for="(lang.lang as string)"
              >{{ toWord(lang.lang) }}</label
            >
          </div>
        </div>
      </div>
      <div class="label-pair">
        <div class="font-semibold text-xl relative">代码</div>
        <textarea
          ref="$editor"
          class="h-screen mt-2 font-mono border-[1px] rounded-xl w-full p-3"
        />
      </div>
      <div class="flex justify-between items-center gap-2 w-full">
        <button :disabled="isGettingCode" @click="getCode" class="submit-btn">
          获取代码
        </button>
        <button
          :disabled="statusUpload === 'uploading'"
          @click="changeCode"
          class="submit-btn"
        >
          修改代码
        </button>
      </div>
    </div>
  </SokuModal>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
