<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

type PropsType = {
  max: number;
  width: number;
  modelValue: number;
  class?: string;
};
const props = defineProps<PropsType>();
const current_position = ref<number>(0);
const $progress = ref<HTMLDivElement>();
const $button = ref<HTMLDivElement>();
const $line = ref<HTMLDivElement>();
const emit = defineEmits(["change", "update:modelValue"]);
const max = ref<number>(0);
const shouldEdit = ref<boolean>(false);

const setButtonPosition = (newV: number) => {
  if (!$button.value) return;
  $button.value.style.setProperty(
    "--moved",
    `${(newV / props.max) * props.width}px`
  );
};

watch(current_position, (newV) => {
  newV = Math.min(newV, props.max);
  newV = Math.max(0, newV);
  current_position.value = newV;
  setButtonPosition(newV);
});

watch(
  () => props.modelValue,
  (newV) => {
    current_position.value = newV;
    emit("update:modelValue", newV);
  }
);

onMounted(async () => {
  await nextTick();
  max.value = Math.max(props.max, props.width);
  $line.value?.style.setProperty("width", `${props.width}px`);
});

const shouldMove = ref<boolean>(false);

const oldV = ref<number>(0);

const handleMousedown = () => {
  shouldMove.value = true;
  oldV.value = current_position.value;
};

window.addEventListener("mousemove", (e) => {
  if (shouldMove.value) {
    const offsetX = $progress.value?.getBoundingClientRect().left;
    let newV = Math.floor((e.clientX - offsetX!) / (props.width / props.max));
    current_position.value = newV;
  }
});

window.addEventListener("mouseup", () => {
  if (!shouldMove.value) return;
  shouldMove.value = false;
  emit("change", current_position.value, oldV.value);
});

const $input = ref<HTMLInputElement>();
const edit = () => {
  shouldEdit.value = true;
  oldV.value = current_position.value;
  if (!$input.value) return;
  $input.value.value = current_position.value.toString();
  $input.value!.focus();
};

const okEdit = () => {
  shouldEdit.value = false;
  if (!$input.value) return;
  const value = parseInt($input.value.value);
  if (isNaN(value)) return;
  current_position.value = value;
  emit("change", current_position.value, oldV.value);
};
</script>

<template>
  <div
    :class="props.class"
    class="select-none w-fit m-auto pr-4 rounded-full relative flex items-center gap-1"
  >
    <div
      v-if="!shouldEdit"
      @click="edit"
      class="px-2 w-fit mr-3 flex justify-end"
    >
      {{ current_position }} / {{ props.max }}
    </div>
    <input
      v-else
      @keyup.enter="okEdit"
      @blur="okEdit"
      ref="$input"
      type="number"
      class="w-24 mr-3 bg-purple-400 rounded-xl px-3"
    />
    <div ref="$progress" class="w-fit flex items-center">
      <div ref="$line" class="bg-purple-900 h-1 rounded-full" />
      <div
        @mousedown="handleMousedown"
        id="button"
        ref="$button"
        class="cursor-pointer w-[14px] h-[14px] bg-purple-700 rounded-full absolute"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
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
