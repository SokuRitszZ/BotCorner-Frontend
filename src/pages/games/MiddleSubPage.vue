<template>
  <div ref="$middle" class="middle w-full h-full rounded-xl overflow-scroll">
    <div
      ref="$parent"
      class="w-full h-2/3 overflow-hidden bg-black rounded-xl flex justify-center items-center"
    >
      <canvas ref="$canvas"></canvas>
    </div>
    <RecordPlayerVue
      ref="$recordPlayer"
      :promise_server="props.promise_server"
    />
    <Bar
      class="w-fit m-auto mt-3 p-1 transition-[0.1s]"
      :list="['进行中', '录像']"
      v-model="show_under"
    />
    <PlayingList
      @watch="toWatch"
      v-show="show_under === 0"
      class="bg-purple-800 mt-3 p-3 rounded-xl w-full h-fit"
      :list_play="list_play"
    />
    <RecordList
      v-show="show_under === 1"
      @play-record="playRecord"
      class="bg-purple-800 mt-3 p-3 rounded-xl w-full h-fit"
    />
  </div>
</template>

<script setup lang="ts">
import useCacheStore from '@/store/cacheStore';
import useGameStore from '@/store/gameStore';
import GameWebSocket from '@/utils/GameWebSocket';
import { onMounted, ref } from 'vue';
import RecordList from './RecordList.vue';
import RecordPlayerVue from '@/components/RecordPlayer.vue';
import { IRecord } from '@/utils/RecordPlayer';
import Bar from '@/components/SokuBar.vue';
import PlayingList, { IPlaying } from './PlayingList.vue';
import { useRouter } from 'vue-router';

type PropsType = {
  promise_server: Promise<GameWebSocket>;
};
const props = defineProps<PropsType>();

const $middle = ref<HTMLDivElement>();
const $parent = ref<HTMLDivElement>();
const $canvas = ref<HTMLCanvasElement>();

const gameStore = useGameStore();
const server = ref<GameWebSocket>();
const gameId = ref<number>(0);
const show_under = ref<number>(0);

const $recordPlayer = ref();

const prepare = (options: {
  mode: 'single' | 'multi' | 'record' | 'watch';
  initData: any;
}) => {
  if (!$parent.value || !$canvas.value || !$middle.value) return;
  $canvas.value.remove();
  $canvas.value = document.createElement('canvas');
  $parent.value.innerHTML = '';
  $parent.value.append($canvas.value);
  gameStore.createGame(name_game.value, $parent.value, $canvas.value);
  gameStore.game
    ?.prepare({
      mode: options.mode,
      initData: options.initData,
    })
    .start();
  $middle.value.scrollTo(0, 0);
};

const playRecord = (record: IRecord) => {
  if (!$middle.value) return;
  $recordPlayer.value.playRecord(record);
};

function toWatch(uuid: string) {
  if (!server.value) return;
  server.value.sendMessage({
    action: 'to watch',
    data: {
      uuid,
    },
  });
}

onMounted(async () => {
  (await props.promise_server)
    .on({
      action: 'init',
      callback: (data) => {
        list_play.value = data.matches;
      },
    })
    .on({
      action: 'one game start',
      callback: (data) => {
        list_play.value.push(data);
      },
    })
    .on({
      action: 'one game over',
      callback: (data) => {
        list_play.value = list_play.value.filter((p) => p.uuid !== data.uuid);
      },
    })
    .on({
      action: 'get current',
      callback: (data: any) => {
        if (!data) {
          window._alert('danger', '该比赛已经结束，请到录像区查看');
          return;
        }
        prepare({
          mode: 'watch',
          initData: data.initData,
        });
        data.steps.forEach((step: string) => {
          gameStore.game?.parseAndAct(step);
        });
      },
    });
});

const list_play = ref<IPlaying[]>([]);

const cacheStore = useCacheStore();
const name_game = ref<string>(useRouter().currentRoute.value.name!.toString());

onMounted(async () => {
  cacheStore.getGames.then(() => {
    gameId.value = cacheStore.getGameId(name_game.value);
  });

  gameStore
    .createGame(name_game.value, $parent.value!, $canvas.value!)
    .on('prepare', (data: any) => {
      if (data.mode !== 'record') $recordPlayer.value.getRecordPlayer().stop();
      window._alert('warning', '等待游戏开始...');
    });

  server.value = (await props.promise_server)
    .on({
      action: 'start single game',
      callback: (data) => {
        if (data.error) {
          return;
        } else {
          prepare(data);
        }
      },
    })
    .on({
      action: 'start multi game',
      callback: (data) => {
        if (data.error) {
          return;
        } else {
          prepare(data);
        }
      },
    })
    .on({
      action: 'set step truly',
      callback: (data) => {
        const step = data.step;
        gameStore.game?.parseAndAct(step);
      },
    })
    .on({
      action: 'play record',
      callback: (data) => {
        window._alert('warning', '开始播放录像');
        prepare(data);
      },
    })
    .on({
      action: 'allow to control',
      callback: () => {
        server.value?.sendMessage({
          action: 'start game',
          data: undefined,
        });
      },
    });
});
</script>
<style scoped lang="scss">
.middle {
  scroll-behavior: smooth;
}
</style>
