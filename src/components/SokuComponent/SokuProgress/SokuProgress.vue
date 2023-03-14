<script setup lang="ts">
import leftpad from '@/utils/leftpad';
import { computed, nextTick, onMounted, ref, watch } from 'vue';

type PropsType = {
  max: number;
  width: number;
  modelValue: number;
  class?: string;
};
const props = defineProps<PropsType>();
const _positionCurrent = ref<number>(0);
const $progress = ref<HTMLDivElement>();
const $button = ref<HTMLDivElement>();
const $line = ref<HTMLDivElement>();
const emit = defineEmits([
  'change',
  'update:modelValue',
  'mouseup',
  'mousedown',
]);
const max = ref<number>(0);
const shouldEdit = ref<boolean>(false);

const setButtonPosition = (newV: number) => {
  if (!$button.value) return;
  $button.value.style.setProperty(
    '--moved',
    `${(newV / props.max) * props.width}px`
  );
};

watch(_positionCurrent, (newV) => {
  newV = Math.min(newV, props.max);
  newV = Math.max(0, newV);
  _positionCurrent.value = newV;
  setButtonPosition(newV);
});

watch(
  () => props.modelValue,
  (newV) => {
    _positionCurrent.value = newV;
    emit('update:modelValue', newV);
  }
);

onMounted(async () => {
  await nextTick();
  max.value = Math.max(props.max, props.width);
  $line.value?.style.setProperty('width', `${props.width}px`);
});

const shouldMove = ref<boolean>(false);

const oldV = ref<number>(0);

function handleMousedown() {
  shouldMove.value = true;
  oldV.value = _positionCurrent.value;
  emit('mousedown');
}

function handleMouseup() {
  emit('mouseup');
}

window.addEventListener('mousemove', (e) => {
  if (shouldMove.value) {
    const offsetX = $progress.value?.getBoundingClientRect().left;
    let newV = Math.floor((e.clientX - offsetX!) / (props.width / props.max));
    _positionCurrent.value = newV;
  }
});

const lenMax = computed(() => props.max.toString().length);

const strPositionCurrent = computed(() =>
  leftpad(lenMax.value, _positionCurrent.value)
);

window.addEventListener('mouseup', () => {
  if (!shouldMove.value) return;
  shouldMove.value = false;
  emit('change', _positionCurrent.value, oldV.value);
});

const $input = ref<HTMLInputElement>();
const edit = () => {
  shouldEdit.value = true;
  oldV.value = _positionCurrent.value;
  if (!$input.value) return;
  $input.value.value = _positionCurrent.value.toString();
  $input.value!.focus();
};
</script>

<template>
  <div
    :class="props.class"
    class="--soku-progress"
  >
    <div @click="edit" class="w-fit flex">
      {{ strPositionCurrent }}
    </div>
    <div ref="$progress" class="w-fit flex items-center mx-3">
      <div ref="$line" class="line h-1 rounded-full" />
      <div
        @mousedown="handleMousedown"
        @mouseup="handleMouseup"
        id="button"
        ref="$button"
        class="button cursor-pointer w-[14px] h-[14px] rounded-full absolute"
      />
    </div>
    <div class="w-fit flex">
      {{ props.max }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
#button {
  --moved: 0px;
  transform: translateX(calc(var(--moved) - 7px));
  transition: 0.2s;
}

#button:active {
  transition: none;
}

input::-webkit-inner-spin-button {
  display: none;
}
</style>
