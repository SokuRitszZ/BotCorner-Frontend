<template>
  <div class="w-full h-full rounded-xl overflow-scroll">
    <div ref="$parent" class="w-full h-2/3 overflow-hidden bg-black rounded-xl flex justify-center items-center">
      <canvas ref="$canvas"></canvas>
    </div>
    <RecordPlayerVue ref="$recordPlayer" :promise_server="props.promise_server" />
    <RecordList @play-record="playRecord" :game-id="gameId" class="bg-purple-800 mt-3 p-3 rounded-xl w-full h-fit" />
  </div>
</template>

<script setup lang="ts">
import useCacheStore from '@/store/cacheStore';
import useGameStore from '@/store/gameStore';
import GameWebSocket from '@/utils/GameWebSocket';
import { onMounted, onUnmounted, ref } from 'vue';
import RecordList from './RecordList.vue';
import RecordPlayerVue from '@/components/RecordPlayer.vue';
import { IRecord } from '@/utils/RecordPlayer';

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

const $recordPlayer = ref();

const prepare = (options: {
  mode: "single" | "multi" | "record",
  initData: any;
}) => {
  if ($canvas.value) $canvas.value.remove();
  $canvas.value = document.createElement("canvas");
  $parent.value.innerHTML = "";
  $parent.value.append($canvas.value);
  gameStore.createGame(props.game, $parent.value, $canvas.value);
  gameStore.game
    ?.prepare({
      mode: options.mode,
      initData: options.initData,
    })
    .start();
};

const playRecord = (record: IRecord) => {
  $recordPlayer.value.playRecord(record);
}

const cacheStore = useCacheStore();

onMounted(async () => {
  cacheStore.getGames
    .then(() => {
      gameId.value = cacheStore.getGameId(props.game);
    });

  gameStore.createGame(props.game, $parent.value, $canvas.value)
    .on("prepare", (data: any) => {
      if (data.mode !== "record") $recordPlayer.value.getRecordPlayer().stop();
      window._alert("warning", "等待游戏开始...");
    });
  
  server.value = (await props.promise_server)
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
        prepare(data);
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
});

onUnmounted(() => {
  gameStore.clearEmit();
});
</script>
<style scoped lang="scss"></style>