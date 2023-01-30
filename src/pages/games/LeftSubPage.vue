<script setup lang="ts">
import ChatRoom from '@/components/ChatRoom.vue';
import ImageHoverDetail from '@/components/ImageHoverDetail.vue';
import Select from '@/components/Select.vue';
import { IEntry } from '@/components/Select.vue';
import useCacheStore from '@/store/cacheStore';
import useUserStore, { IUser } from '@/store/userStore';
import GameWebSocket from '@/utils/GameWebSocket';
import leftpad from '@/utils/leftpad';
import { nanoid } from 'nanoid';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

type IMode = "single" | "multi";
type IStatus = "to start" | "starting" | "started";
type IMatchStatus = "to match" | "matching" | "matched" | "waiting";

const mode = ref<IMode>("single");
const status = ref<IStatus>("to start");
const match_status = ref<IMatchStatus>("to match");
const botList = ref<IEntry<number>[]>([{ key: "亲自出马", value: 0 }]);
const single_botId = ref<(number | undefined)[]>([undefined, undefined]);
const multi_botId = ref<number>(0);
const multi_userData = ref<IUser[]>([]);
const multi_isOk = ref<boolean[]>([false, false]);
const cacheStore = useCacheStore();
const userStore = useUserStore();

type PropsType = {
  promise_server: Promise<GameWebSocket>;
  class?: string
};
const props = defineProps<PropsType>();
const server = ref<GameWebSocket>();

onMounted(async () => {
  server.value = await props.promise_server;
  server.value
    .on({
      action: "start single game",
      callback: data => {
        if (data.error) {
          window._alert("danger", data.error);
          status.value = "to start";
          return;
        } else {
          status.value = "started";
        }
      }
    })
    .on({
      action: "start multi game",
      callback: data => {
        match_status.value = "waiting";
        multi_isOk.value = [false, false];
      }
    })
    .on({
      action: "make match",
      callback: data => {
        multi_userData.value = data.userData;
        match_status.value = "matched";
        multi_isOk.value = [false, false];
      }
    })
    .on({
      action: "allow to control",
      callback: data => {
        status.value = "started";
        match_status.value = "to match";
      }
    })
    .on({
      action: "tell result",
      callback: data => {
        status.value = "to start";
        match_status.value = "to match";
      }
    })
    .on({
      action: "start match", // 确认帧
      callback: data => {
        clearTimeout(match_timer.value);
      }
    })
    .on({
      action: "exit match",
      callback: data => {
        const id = data.id;
        if (id !== getMe()) {
          window._alert("primary", "对方退出");
          match_status.value = "matching";
        }
      }
    })
    .on({
      action: "toggle match",
      callback: data => {
        multi_isOk.value[data.id] = data.isOk;
      }
    })
});

const startSingleMode = () => {
  status.value = "starting";
  props.promise_server
    .then(server => {
      server.sendMessage({
        action: 'start single game',
        data: {
          botIds: single_botId.value.map(x => x || 0),
        },
      });
    });
};

const getMe = () => {
  return userStore.id === multi_userData.value[1].id ? 1 : 0;
};

const match_timer = ref<NodeJS.Timer>();
const startMatching = () => {
  status.value = "starting";
  match_status.value = "matching";
  server.value?.sendMessage({
    action: "start match",
    data: {
      botId: multi_botId.value,
    }
  });
  match_timer.value = setTimeout(() => {
    match_status.value = "to match";
    clearTimeout(match_timer.value);
  }, 5000);
};

const exitMatching = () => {
  status.value = "to start";
  match_status.value = "to match";
  server.value?.sendMessage({
    action: "exit match",
    data: {
      id: getMe(),
    }
  });
};

const ok = (id: number) => {
  if (getMe() !== id) return false;
  server.value?.sendMessage({
    action: "toggle match",
    data: {
      isOk: !multi_isOk.value[id]
    }
  });
};

const disabled_single = computed(() => mode.value !== 'single' || status.value !== 'to start');

const disabled_multi = computed(() => mode.value !== 'multi' || status.value !== 'to start');

const disabled_exit = computed(() => mode.value !== 'multi' || status.value !== 'starting' || match_status.value === 'to match');

const name_game = ref<string>(useRouter().currentRoute.value.name!.toString());

onMounted(() => {
  userStore.addAfterLoginCallback("get bot list by game id", () => {
    cacheStore.getBots
      .then(list => {
        botList.value.push(...list.filter(bot => bot.gameId === cacheStore.getGameId(name_game.value)).map(bot => ({ key: bot.title + '#' + bot.id, value: bot.id })));
      });
  })
});

const send = (content: string) => {
  if (!content.length) return ;
  server.value?.sendMessage({
    action: "send talk",
    data: {
      sender: userStore.username,
      content,
    }
  });
};

const $chatroom = ref();

onMounted(async () => {
  (await props.promise_server)
    .on({
      action: "send talk",
      callback: data => {
        $chatroom.value.addMessage({
          ...data,
          type: "talk",
          id: nanoid(11),
        });
      }
    })
})

</script>

<template>
  <div :class="[props.class, 'bg-purple-500 rounded-3xl shadow-2xl p-7 w-full']">
    <ChatRoom ref="$chatroom" @send="send" />
    <div class="w-full mt-3">
      <h1 class="text-center text-3xl flex justify-between items-center">
        <button :disabled="status !== 'to start'" @click="mode = 'single'"
          :class="{ 'bg-purple-700 text-white': mode === 'single', 'text-purple-700': mode !== 'single' }"
          class="cursor-pointer p-2 rounded-xl transition border-2 border-purple-700">
          单人模式
        </button>
        <button :disabled="disabled_single" @click="startSingleMode"
          class="text-white text-xl bg-green-700 py-1 px-3 rounded-lg hover:bg-green-800 active:bg-green-900">开始</button>
      </h1>
      <input :disabled="disabled_single" placeholder="Bot的编号，不填代表手动" v-model="single_botId[0]" type="number"
        class="rounded-xl py-2 px-3 w-full mt-3 bg-purple-200 border-2 border-purple-400 focus:border-purple-900 outline-none">
      <input :disabled="disabled_single" placeholder="Bot的编号，不填代表手动" v-model="single_botId[1]" type="number"
        class="rounded-xl py-2 px-3 w-full mt-3 bg-purple-200 border-2 border-purple-400 focus:border-purple-900 outline-none">
    </div>
    <div class="w-full pt-10">
      <h1 class="text-3xl text-center flex justify-between items-center">
        <button :disabled="status !== 'to start'" @click="mode = 'multi'"
          :class="{ 'bg-purple-700 text-white': mode === 'multi', 'text-purple-700': mode !== 'multi' }"
          class="cursor-pointer p-2 rounded-xl transition border-2 border-purple-700">
          多人模式
        </button>
        <button :disabled="disabled_exit" @click="exitMatching"
          class="text-white text-xl bg-red-700 py-1 px-3 rounded-lg hover:bg-red-800 active:bg-red-900">退出</button>
        <button :disabled="disabled_multi" @click="startMatching"
          class="text-white text-xl bg-green-700 py-1 px-3 rounded-lg hover:bg-green-800 active:bg-green-900">开始</button>
      </h1>
      <div class="pt-3">
        <Select :disabled="disabled_multi" v-model="multi_botId" class="h-10 rounded-xl w-full" :list="botList" />
      </div>
    </div>
    <div class="w-full pt-3 relative">
      <Transition>
        <!-- matching -->
        <div v-if="match_status === 'matching'" class="w-full flex justify-center items-center gap-5 absolute left-0">
          <img :src="userStore.avatar" class="rotate rounded-full w-16 h-16" alt="avatar">
          <div class="text-2xl">
            寻找对手中......
          </div>
        </div>
        <!-- matched -->
        <div v-else-if="match_status === 'matched'" class="w-full absolute left-0">
          <div class="w-full flex justify-between items-center">
            <ImageHoverDetail @click="ok(0)" :src="multi_userData[0].avatar"
              :class="`w-16 h-16 rounded-full border-4 cursor-pointer transition ${multi_isOk[0] ? 'border-purple-800' : 'border-red-700'}`">
              <h1 class="whitespace-nowrap">
                {{ multi_userData[0].username }}#{{ leftpad(8, multi_userData[0].id) }}
              </h1>
            </ImageHoverDetail>
            <div class="text-white">
              点击头像准备
            </div>
            <ImageHoverDetail @click="ok(1)" :src="multi_userData[1].avatar"
              :class="`w-16 h-16 rounded-full border-4 cursor-pointer transition ${multi_isOk[1] ? 'border-purple-800' : 'border-blue-700'}`">
              <h1 class="whitespace-nowrap">
                {{ multi_userData[1].username }}#{{ leftpad(8, multi_userData[1].id) }}
              </h1>
            </ImageHoverDetail>
          </div>
        </div>
        <!-- waiting -->
        <div v-else-if="match_status === 'waiting'" class="w-full flex justify-center items-center text-xl text-gray-50">
          等待Bot编译完成......
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes rot {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.rotate {
  animation: rot linear 10s infinite;
}

.v-enter-active,
.v-leave-active {
  animation-timing-function: ease-out;
  transition: .5s;
}

.v-enter-from,
.v-leave-to {
  @apply -translate-y-3 opacity-0;
}

.v-enter-to,
.v-leave-from {
  @apply translate-y-0 opacity-100;
}
</style>