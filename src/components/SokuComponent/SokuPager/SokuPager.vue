<script setup lang="ts">
import { ref, watch } from 'vue';

type PropsType = {
  class?: string | string[];
  max: number;
  modelValue?: number;
};
const props = defineProps<PropsType>();

const emit = defineEmits(['update:modelValue']);
const ptr = ref<number>(props.modelValue || 0);
watch(ptr, (newV) => {
  emit('update:modelValue', newV);
});

function next() {
  ptr.value = Math.min(ptr.value + 1, props.max - 1);
}

function prev() {
  ptr.value = Math.max(0, ptr.value - 1);
}

defineExpose({
  next,
  prev,
});
</script>

<template>
  <nav class="select-none w-fit" :class="props.class">
    <button @click="prev" class="option">&leftarrow;</button>
    <button @click="ptr = 1" class="option" v-show="ptr > 2">1</button>
    <button @click="ptr -= 2" class="option" v-show="ptr > 2">...</button>
    <button
      class="option"
      :class="[ptr === idx ? 'active' : '']"
      v-for="(i, idx) of props.max"
      :key="i"
      v-show="Math.abs(idx - ptr) <= 2"
      @click="ptr = idx"
    >
      {{ i }}
    </button>
    <button @click="ptr += 2" class="option" v-show="ptr < props.max - 3">...</button>
    <button @click="ptr = props.max - 1" class="option" v-show="ptr < props.max - 3">{{ props.max }}</button>
    <button @click="next" class="option">&rightarrow;</button>
  </nav>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
