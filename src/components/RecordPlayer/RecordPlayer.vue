<script setup lang="ts">
import useGameStore from '@/store/gameStore';
import RecordPlayer, { IRecord } from '@/utils/RecordPlayer';
import { onMounted, onUnmounted, ref, toRaw, watch } from 'vue';
import Icon from '../BootstrapIcon.vue';
import Progress from '../SokuComponent/SokuProgress/SokuProgress.vue';
import { IEntry } from '../SokuComponent/SokuSelect.vue';
import repeat from '@/utils/repeat';
import useMatchStore from '@/store/matchStore';

const recordPlayer = ref<RecordPlayer>();
const record_max = ref<number>(1);
const record_current = ref<number>(0);

const playRecord = (record: IRecord) => {
  recordPlayer.value?.load(record).setSpeed(speed.value).play();
};

const getRecordPlayer = () => toRaw(recordPlayer.value);

defineExpose({
  playRecord,
  getRecordPlayer,
});

const gameStore = useGameStore();
const matchStore = useMatchStore();

async function prepare() {
  const server = matchStore.server!;

  recordPlayer.value = new RecordPlayer(
    (initData: any): void => {
      const data = {
        mode: 'record',
        initData,
      };
      server.emit('play record', data);
    },
    gameStore.game!.next,
    (cur) => gameStore.game!.upend(cur) /// !!!
  )
    .on('next', (curV: number, step: string) => {
      server.emit('set step truly', {
        step,
      });
    })
    .on('load', (data: any) => {
      record_max.value = data.max;
      status.value = 'playing';
    })
    .on('next', (curV: number, step: string, stepCnt: number) => {
      record_current.value = stepCnt;
    })
    .on('upend', (curV: number, stepCnt: number) => {
      record_current.value = stepCnt;
      server.emit('upend');
    })
    .on('pause', () => {
      status.value = 'pausing';
    })
    .on('continue', () => {
      status.value = 'playing';
    })
    .on('stop', () => {
      status.value = 'ready';
    });
}

onMounted(() => {
  const record = gameStore.record!;

  gameStore.on('prepare', () => {
    prepare();
  });

  gameStore.on('start', () => {
    playRecord(record);
  });
});

onUnmounted(async () => {
  recordPlayer.value?.stop().clearEmit();
  recordPlayer.value = undefined;
});

const speed = ref<number>(1);
const speedList = ref<IEntry[]>([
  { key: 'x1', value: 1 },
  { key: 'x2', value: 2 },
  { key: 'x4', value: 4 },
  { key: 'x8', value: 8 },
]);
watch(speed, (newV) => {
  if (!recordPlayer.value) return;
  recordPlayer.value?.setSpeed(newV);
});

type IStatus = 'ready' | 'playing' | 'pausing';

const status = ref<IStatus>('ready');

const isStatus = (st: IStatus) => {
  return status.value === st;
};

const isRecord = () => {
  return gameStore.game && gameStore.game.mode === 'record';
};

const _upend = () => {
  if (!isRecord()) return;
  recordPlayer.value?.pause();
  recordPlayer.value?.upend();
};

const _next = () => {
  if (!isRecord()) return;
  recordPlayer.value?.pause();
  recordPlayer.value?.next();
};

const _continue = () => {
  if (!isRecord()) return;
  if (!isStatus('pausing')) return;
  if (!recordPlayer.value) return;
  recordPlayer.value.continue();
};

const _pause = () => {
  if (!isRecord()) return;
  if (!isStatus('playing')) return;
  if (!recordPlayer.value) return;
  recordPlayer.value.pause();
};

function change(newV: number, oldV: number) {
  if (!isRecord()) return;
  if (newV !== oldV) {
    if (newV < oldV) {
      repeat(oldV - newV, () => recordPlayer.value?.upend());
    } else {
      repeat(newV - oldV, () => recordPlayer.value?.next());
    }
  }
}

function handleMousedown() {
  recordPlayer.value?.pause();
}

function handleMouseup() {
  recordPlayer.value?.continue();
}
</script>

<template>
  <div class="record-player">
    <Progress
      @change="change"
      @mousedown="handleMousedown"
      @mouseup="handleMouseup"
      class="mt-2"
      v-model="record_current"
      :max="record_max"
      :width="400"
    />
    <div class="controllers">
      <Icon @click="_upend" class="icon" type="skip-rev" :size="28" />
      <Icon
        @click="_continue"
        v-if="isStatus('pausing')"
        class="icon"
        type="play"
        :size="28"
      />
      <Icon @click="_pause" v-else class="icon" type="pause" :size="28" />
      <Icon @click="_next" class="icon" type="skip" :size="28" />
      <select
        v-model="speed"
        class="rounded-xl w-full p-2 py-1 h-7"
        :list="speedList"
      >
        <option v-for="kv in speedList" :value="kv.value" :key="kv.key">
          {{ kv.key }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
.icon {
  @apply hover:text-gray-800 active:text-gray-900;
}
</style>
