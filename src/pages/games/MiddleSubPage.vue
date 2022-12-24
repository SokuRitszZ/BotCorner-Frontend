<template>
  <div ref="$parent" class="w-full h-2/3 bg-black rounded-3xl overflow-hidden flex justify-center items-center">
    <canvas ref="$canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import Game from '@/script/game/Game';
import SnakeGame from '@/script/game/snake/SnakeGame';
import GameWebSocket from '@/utils/GameWebSocket';
import { onMounted, ref } from 'vue';
type PropsType = {
  promise_server: Promise<GameWebSocket>;
};
const props = defineProps<PropsType>();

const $parent = ref();
const $canvas = ref();

const game = ref<Game>();
const server = ref<GameWebSocket>();

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
    .addCallback({
      action: "start single game",
      callback: data => {
        if (data.error) {
          return;
        } else {
          prepare(data);
        }
      }
    })
    .addCallback({
      action: "move snake",
      callback: (data) => {
        const step = data.step;
        game.value!.parseAndAct(step);
      }
    })
    .addCallback({
      action: "start multi game",
      callback: data => {
        if (data.error) {
          return ;
        } else {
          prepare(data);
        }
      }
    })
    .addCallback({
      action: "allow to control",
      callback: data => {
        server.value?.sendMessage({
          action: "start game",
          data: undefined
        });
      }
    });
});
</script>
<style scoped lang="scss"></style>