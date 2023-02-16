<script setup lang="ts">
import useCacheStore, { IBot, IGame, ILang } from "@/store/cacheStore";
import leftpad from "@/utils/leftpad";
import { ref } from "vue";
import toWord from "@/utils/toWord";
import { getCodeApi, updateBotApi } from "@/api/bots";

type PropsType = {
  bot: IBot | undefined;
};

const props = defineProps<PropsType>();
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
      $editor.value.value = code || "";
      // eslint-disable-next-line vue/no-mutating-props
      props.bot.code = code || "";
      window._alert("success", "获取成功");
    } catch (error) {
      window._alert("danger", `获取失败：${error}`);
    }
    isGettingCode.value = false;
  }
}

function reset() {
  $editor.value.value = "";
}

defineExpose({
  reset,
});

const uploadStatus = ref<"to upload" | "uploading">("to upload");

const changeCode = () => {
  uploadStatus.value = "uploading";
  const code = $editor.value.getContent();
  updateBotApi(props.bot!.id, {
    code,
  })
    .then((info: any) => {
      props.bot!.code = code;
      props.bot!.modifyTime = info.modifyTime;
      window._alert("success", "修改成功");
    })
    .catch((error) => {
      window._alert("danger", `修改失败：${error}`);
    })
    .finally(() => {
      uploadStatus.value = "to upload";
    });
};

const changeTitle = async (e: Event, bot: IBot) => {
  const dom = e.target;
  const newTitle = (dom as HTMLInputElement).value;
  updateBotApi(bot.id, {
    title: newTitle,
  })
    .then((info: any) => {
      // success
      bot.title = newTitle;
      bot.modifyTime = info.modifyTime;
      window._alert("success", "修改成功");
    })
    .catch((error) => {
      // fail
      window._alert("danger", `修改失败：${error}`);
    });
};

const changeDescription = (e: Event, bot: IBot) => {
  const dom = e.target;
  const newDescription = (dom as HTMLTextAreaElement).value;
  updateBotApi(bot.id, {
    description: newDescription,
  })
    .then((info: any) => {
      // success
      bot.description = newDescription;
      bot.modifyTime = info.modifyTime;
      window._alert("success", "修改成功");
    })
    .catch((error) => {
      // fail
      window._alert("danger", `修改失败：${error}`);
    });
};

const emit = defineEmits(["delete"]);

const isDeleting = ref<boolean>(false);
const deleteInputValue = ref<string>();

const toDelete = (bot?: IBot) => {
  if (!bot) return;
  if (!isDeleting.value) isDeleting.value = true;
  else {
    if (deleteInputValue.value === bot.title) {
      // success
      emit("delete");
    } else {
      // fail
      isDeleting.value = false;
      window._alert("danger", "删除失败 输入名称不一致", 2000);
    }
  }
};
</script>

<template>
  <div :class="`pt-24 px-16 h-screen overflow-scroll`" v-if="bot">
    <h1 class="text-4xl font-bold relative items-center">
      详细信息
      <div class="block absolute right-0 top-0 text-xl font-normal">
        <button
          @click="toDelete(props.bot)"
          class="bg-red-700 hover:bg-red-800 active:bg-red-900 text-white px-3 py-2 rounded-lg"
        >
          删除
        </button>
        <Transition name="delete-input">
          <input
            v-model="deleteInputValue"
            v-if="isDeleting"
            class="absolute right-0 p-2 translate-y-[140%] border-[1px] border-red-700 rounded-lg text-sm w-72"
            type="text"
            placeholder="输入Bot名称并按下“删除”以确认删除"
          />
        </Transition>
      </div>
    </h1>
    <hr class="p-3 mt-5" />
    <div>
      <div class="font-semibold text-xl">名称</div>
      <input
        @change="e => changeTitle(e, bot!)"
        class="mt-1 w-full p-1 border-[1px] rounded-lg px-2"
        type="text"
        :value="bot.title"
      />
    </div>
    <div class="pt-5">
      <div class="font-semibold text-xl">编号</div>
      <input
        class="mt-1 w-full p-1 border-[1px] rounded-lg px-2"
        type="text"
        :value="leftpad(8, bot.id)"
        disabled
      />
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">描述</p>
      <textarea
        @change="e => changeDescription(e, bot!)"
        :value="bot.description"
        name="description"
        id="description"
        class="resize-none w-full h-52 mt-1 border-[1px] rounded-lg p-2"
      >
      </textarea>
    </div>
    <div class="pt-5">
      <p class="font-semibold text-xl">游戏</p>
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
    <div class="pt-5">
      <p class="font-semibold text-xl">语言</p>
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
    <div class="pt-5">
      <div class="font-semibold text-xl relative mb-10">
        代码
        <div class="absolute right-0">
          <button
            :disabled="isGettingCode"
            @click="getCode"
            class="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-sm p-2 rounded-lg text-white mr-2"
          >
            获取代码
          </button>
          <button
            :disabled="uploadStatus === 'uploading'"
            @click="changeCode"
            class="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-sm p-2 rounded-lg text-white disabled:bg-purple-300"
          >
            上传修改
          </button>
        </div>
      </div>
      <textarea
        ref="$editor"
        class="h-screen mt-2 font-mono border-[1px] rounded-xl w-full p-3"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
input[type="radio"]:checked + label {
  @apply bg-purple-500 text-gray-100 border-0;
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
}
</style>
