<script setup lang="ts">
import useGameStore from '@/store/gameStore';
import GameWebSocket from '@/utils/GameWebSocket';
import RecordPlayer, { IRecord } from '@/utils/RecordPlayer';
import { onMounted, ref, toRaw, watch } from 'vue';
import Icon from './Icon.vue';
import Progress from './Progress.vue';
import { IEntry } from './Select.vue';
import Select from './Select.vue';
import repeat from "@/utils/repeat";

type PropsType = {
  promise_server: Promise<GameWebSocket>;
};
const props = defineProps<PropsType>();

const recordPlayer = ref<RecordPlayer>();
const record_max = ref<number>(1);
const record_current = ref<number>(0);

const playRecord = (record: IRecord) => {
  recordPlayer.value?.load(record)
    .setSpeed(speed.value)
    .play();
};

const getRecordPlayer = () => toRaw(recordPlayer.value);

defineExpose({
  playRecord,
  getRecordPlayer
});

const gameStore = useGameStore();
const server = ref<GameWebSocket>();

onMounted(async () => {
  server.value = await props.promise_server;

  recordPlayer.value = new RecordPlayer(
    (initData: any): void => {
      const data = {
        mode: "record",
        initData
      }
      server.value!.emit({
        action: "play record",
        data
      });
    },
    gameStore.game!.next,
    (cur, record) => gameStore.game!.upend(cur, record) /// !!!
  )
    .on("next", (curV: number, step: string, stepCnt: number) => {
      server.value!.emit({
        action: "set step truly",
        data: {
          step
        }
      });
    })
    .on("load", (data: any) => {
      record_max.value = data.max;
      status.value = "playing";
    })
    .on("next", (curV: number, step: string, stepCnt: number) => {
      record_current.value = stepCnt;
    })
    .on("upend", (curV: number, stepCnt: number) => {
      record_current.value = stepCnt;
      server.value?.emit({
        action: 'upend',
        data: undefined
      });
    })
    .on("pause", () => {
      status.value = "pausing";
    })
    .on("continue", () => {
      status.value = "playing";
    })
    .on("stop", () => {
      status.value = "ready";
    })
});

const speed = ref<number>(1);
const speedList = ref<IEntry[]>([
  { key: "x1", value: 1, },
  { key: "x2", value: 2, },
  { key: "x4", value: 4, },
]);
watch(speed, newV => {
  if (!recordPlayer.value) return ;
  recordPlayer.value?.setSpeed(newV);
});

type IStatus = "ready" | "playing" | "pausing";

const status = ref<IStatus>("ready");

const isStatus = (st: IStatus) => {
  return status.value === st;
};

const isRecord = () => {
  return gameStore.game && gameStore.game.mode === "record";
};

const _upend = () => {
  if (!isRecord()) return ;
  if (!isStatus("pausing")) return ;
  if (!recordPlayer.value) return ;
  recordPlayer.value.upend();
}

const _next = () => {
  if (!isRecord()) return ;
  if (!isStatus("pausing")) return ;
  if (!recordPlayer.value) return ;
  recordPlayer.value.next();
}

const _continue = () => {
  if (!isRecord()) return ;
  if (!isStatus("pausing")) return ;
  if (!recordPlayer.value) return ;
  recordPlayer.value.continue();
}

const _pause = () => {
  if (!isRecord()) return ;
  if (!isStatus("playing")) return ;
  if (!recordPlayer.value) return ;
  recordPlayer.value.pause();
}

const change = (newV: number, oldV: number) => {
  if (!isRecord()) return ;
  if (newV !== oldV) {
    if (newV < oldV) {
      repeat(oldV - newV, () => recordPlayer.value?.upend());
    } else {
      repeat(newV - oldV, () => recordPlayer.value?.next());
    }
  }
}

</script>

<template>
  <div class="w-full">
    <Progress @change="change" class="mt-3 bg-purple-500 text-purple-300" v-model="record_current" :width="300" :max="record_max" />
    <div id="controllers" class="select-none w-fit px-4 py-2 bg-purple-400 m-auto mt-3 rounded-full flex justify-center items-center gap-3">
      <Icon @click="_upend" class="icon" type="skip-rev" :size="28" />
      <Icon @click="_continue" v-if="isStatus('pausing')" class="icon" type="play" :size="28" />
      <Icon @click="_pause" v-else class="icon" type="pause" :size="28" />
      <Icon @click="_next" class="icon" type="skip" :size="28" />
      <Select v-model="speed" class="rounded-xl w-full p-2 py-1 h-7" :list="speedList" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon {
  @apply hover:text-purple-800 active:text-purple-900
}
</style>