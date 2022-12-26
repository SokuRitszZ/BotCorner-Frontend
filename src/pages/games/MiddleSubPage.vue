<template>
  <div class="w-full h-full rounded-xl overflow-scroll">
    <div ref="$parent" class="w-full h-2/3 overflow-hidden bg-black rounded-xl flex justify-center items-center">
      <canvas ref="$canvas"></canvas>
    </div>
    <div class="mt-3 text-gray-300 rounded-xl flex justify-center items-center bg-purple-800 p-3">
      录像播放控件
    </div>
    <RecordList @play-record="playRecord" :game-id="1" class="bg-purple-800 mt-3 p-3 rounded-xl w-full h-fit" />
  </div>
</template>

<script setup lang="ts">
import Game from '@/script/game/Game';
import SnakeGame from '@/script/game/snake/SnakeGame';
import GameWebSocket from '@/utils/GameWebSocket';
import RecordPlayer, { IRecord } from '@/utils/RecordPlayer';
import { onMounted, ref } from 'vue';
import RecordList from './RecordList.vue';
type PropsType = {
  promise_server: Promise<GameWebSocket>;
};
const props = defineProps<PropsType>();

const $parent = ref();
const $canvas = ref();

const game = ref<Game>();
const server = ref<GameWebSocket>();

const recordPlayer = ref<RecordPlayer>();

const playRecord = (record: IRecord) => {
  recordPlayer.value?.load(record)
    .setSpeed(2)
    // .on("stop", () => console.log("stop"))
    .play();
};

const prepare = (options: {
  mode: "single" | "multi" | "record",
  initData: any;
}) => {
  if ($canvas.value) $canvas.value.remove();
  $canvas.value = document.createElement("canvas");
  $parent.value.append($canvas.value);
  game.value = new SnakeGame($parent.value, $canvas.value);
  game.value.prepare({
    mode: options.mode,
    initData: options.initData,
  });
  game.value.start();
};


onMounted(async () => {
  game.value = new SnakeGame($parent.value, $canvas.value);
  
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
      action: "move snake",
      callback: (data) => {
        const step = data.step;
        game.value!.parseAndAct(step);
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
    (cur, record) => {
      const step = record.steps.slice(cur.v, cur.v + 5);
      cur.v += 5;
      return step;
    },
    () => "",
  )
    .on("next", (curV: number, step: string) => {
      server.value?.emit({
        action: "move snake",
        data: {
          step
        }
      });
    });
  ;
});
</script>
<style scoped lang="scss"></style>