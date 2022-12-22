<template>
  <div :class="props.class" class="grid grid-cols-3 grid-rows-3">
    <button :disabled="props.disabled" @click="() => current = 0" :class="props.buttonClass +' '+ (current === 0 ? activeClass:'')" class="bg-white row-span-1 col-span-1 row-start-1 col-start-2">上</button>
    <button :disabled="props.disabled" @click="() => current = 1" :class="props.buttonClass +' '+ (current === 1 ? activeClass:'')" class="bg-white row-span-1 col-span-1 row-start-2 col-start-1">左</button>
    <button :disabled="props.disabled" class="row-span-1 col-span-1 row-start-2 col-start-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold">好</button>
    <button :disabled="props.disabled" @click="() => current = 2" :class="props.buttonClass +' '+ (current === 2 ? activeClass:'')" class="bg-white row-span-1 col-span-1 row-start-2 col-start-3">右</button>
    <button :disabled="props.disabled" @click="() => current = 3" :class="props.buttonClass +' '+ (current === 3 ? activeClass:'')" class="bg-white row-span-1 col-span-1 row-start-3 col-start-2">下</button>
  </div>
</template>

<script setup lang="ts">import { ref } from 'vue';

type PropsType = {
  class?: string
  buttonClass: string
  activeClass: string
  disabled?: boolean
}
const props = defineProps<PropsType>();

const current = ref<number>(0);
</script>

<style scoped lang="scss">
input {
  @apply hidden;
}
button {
  @apply flex justify-center items-center disabled:cursor-not-allowed;
}

</style>