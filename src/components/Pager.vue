<template>
  <nav :class="props.class" class="flex justify-start ">
    <button @click="select(ptr - 1)" :disabled="ptr === 0" class="btn rounded-l-xl bg-purple-600">左</button>
    <button @click="select(0)" class="btn bg-purple-600">首</button>
    <button class="btn bg-purple-600" disabled>...</button>
    <button @click="select(idx)" v-show="Math.abs(idx - ptr) <= 2" v-for="(item, idx) in props.max" class="btn" :class="{'bg-purple-900': ptr === idx, 'bg-purple-600': ptr !== idx}">
      {{ item }}
    </button>
    <button class="btn bg-purple-600" disabled>...</button>
    <button @click="select(props.max - 1)" class="btn bg-purple-600">尾</button>
    <button @click="select(ptr + 1)" :disabled="ptr === max - 1" class="btn rounded-r-xl bg-purple-600">右</button>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type PropsType = {
  class?: string;
  max: number;
};
const props = defineProps<PropsType>();
const ptr = ref<number>(0);

const emit = defineEmits(["change-page"])

const select = (idx: number) => {
  ptr.value = idx;
  emit("change-page", idx);
};

</script>

<style scoped lang="scss">
.btn {
  @apply w-10 h-10 flex justify-center items-center text-white hover:bg-purple-800 active:bg-purple-900 cursor-pointer;
}
</style>