<script setup lang="ts">
import { isNumber } from 'lodash';
import { nextTick, ref, toRaw, watch } from 'vue';

type PropsType = {
  list: string[]
  class?: string
  modelValue?: number
};
const props = defineProps<PropsType>();
const $slug = ref<HTMLDivElement>();
const $options = ref<HTMLDivElement[]>([]);

const animating = ref<boolean>(false);

function animate() {
  if (animating.value) return false;
  animating.value = true;
  setTimeout(() => animating.value = false, 1000);
  return true;
}

const ptr = ref<number>(-1);
const emit = defineEmits(["update:modelValue"]);
watch(() => props.modelValue, (newV) => {
  if (!isNumber(newV)) return ;
  slideTo(newV);
  emit("update:modelValue", newV);
});

watch(ptr, async (newV, oldV) => {
  if (newV === oldV) return ;
  await nextTick();
  const option = toRaw($options.value)[newV];
  emit("update:modelValue", newV);
  if (!option) return;
  $slug.value?.style.setProperty("height", `${option.clientHeight}px`);
  $slug.value?.style.setProperty("width", `${option.clientWidth}px`);
  $slug.value?.style.setProperty("--movedX", `${option.offsetLeft}px`);
});

function slideTo(index: number) {
  if (!animate()) return;
  ptr.value = index;
}

</script>

<template>
  <div :class="['p-3 rounded-full bg-gray-600 opacity-60', props.class]">
    <div class="flex items-center w-fit h-fit relative">
      <div ref="$slug" class="-z-10 slug h-full bg-purple-900 w-10 absolute rounded-full"> </div>
      <div @click="slideTo(index)" ref="$options" :class="['transition cursor-pointer px-4 py-1 whitespace-nowrap', index === ptr && 'text-white']" v-for="(item, index) in list" :key="index">{{
        item
      }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slug {
  --movedX: 0;

  transform: translateX(var(--movedX));
  transition: 1s;
}
</style>