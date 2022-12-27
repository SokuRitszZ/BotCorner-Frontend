<template>
  <div class="w-full h-full rounded-xl overflow-scroll">
    <div ref="$parent" class="w-full h-2/3 overflow-hidden bg-black rounded-xl flex justify-center items-center">
      <canvas ref="$canvas"></canvas>
    </div>
    <div class="mt-3 text-gray-300 rounded-xl flex justify-center items-center bg-purple-800 p-3">
      录像播放控件
    </div>
    <RecordList @play-record="playRecord" :game-id="gameId" class="bg-purple-800 mt-3 p-3 rounded-xl w-full h-fit" />
  </div>
</template>

<script setup lang="ts">
import useCacheStore from '@/store/cacheStore';
import useGameStore from '@/store/gameStore';
import GameWebSocket from '@/utils/GameWebSocket';
import RecordPlayer, { IRecord } from '@/utils/RecordPlayer';
import { onMounted, onUnmounted, ref } from 'vue';
import RecordList from './RecordList.vue';
type PropsType = {
  promise_server: Promise<GameWebSocket>;
  game: string;
};
const props = defineProps<PropsType>();

const $parent = ref();
const $canvas = ref();

const gameStore = useGameStore();
const server = ref<GameWebSocket>();
const gameId = ref<number>(0);

const recordPlayer = ref<RecordPlayer>();

const playRecord = (record: IRecord) => {
  recordPlayer.value?.load(record)
    .setSpeed(2)
    .play();
};

const prepare = (options: {
  mode: "single" | "multi" | "record",
  initData: any;
}) => {
  if ($canvas.value) $canvas.value.remove();
  $canvas.value = document.createElement("canvas");
  $parent.value.append($canvas.value);
  gameStore.createGame(props.game, $parent.value, $canvas.value);
  gameStore.game
    ?.prepare({
      mode: options.mode,
      initData: options.initData,
    })
    .start();
};

const cacheStore = useCacheStore();

onMounted(async () => {
  cacheStore.getGames()
    .then(() => {
      gameId.value = cacheStore.getGameId(props.game);
    });

  gameStore.createGame(props.game, $parent.value, $canvas.value)
    .on("prepare", (data: any) => {
      window._alert("warning", "等待游戏开始...");
    });
  
  server.value = await props.promise_server;

  server.value
    .on({
      action: "start single game",
      callback: data => {
        if (data.error) {
          return;
        } else {
          prepare(data);
        }
      }
    })
    .on({
      action: "set step truly",
      callback: (data) => {
        const step = data.step;
        gameStore.game?.parseAndAct(step);
      }
    })
    .on({
      action: "start multi game",
      callback: data => {
        if (data.error) {
          return ;
        } else {
          prepare(data);
        }
      }
    })
    .on({
      action: "play record",
      callback: data => {
        window._alert("warning", "开始播放录像");
      }
    })
    .on({
      action: "allow to control",
      callback: _data => {
        server.value?.sendMessage({
          action: "start game",
          data: undefined
        });
      }
    });

  recordPlayer.value = new RecordPlayer(
    (initData: any): void => {
      server.value?.emit({
        action: "play record",
        data: undefined
      });
      prepare({
        mode: "record",
        initData
      });
    },
    gameStore.game!.next,
    () => "",
  )
    .on("next", (curV: number, step: string) => {
      server.value?.emit({
        action: "set step truly",
        data: {
          step
        }
      });
    });
});

onUnmounted(() => {
  gameStore.clearEmit();
});
</script>
<style scoped lang="scss"></style>