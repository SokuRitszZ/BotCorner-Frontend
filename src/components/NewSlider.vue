<script setup lang="ts">
import useCacheStore, { IGame } from '@/store/cacheStore';
import { isNumber } from 'lodash';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

type PropsType = {
  class?: string
  width: number
  height: number
  modelValue?: number
};
const props = defineProps<PropsType>();
const router = useRouter();
const games = ref<IGame[]>([]);
const cacheStore = useCacheStore();

onMounted(() => {
  cacheStore.getGames
    .then(list => {
      games.value = list;
    });
});

const $slider = ref<HTMLDivElement>();
const animating = ref<boolean>(false);
const ptr = ref<number>(0);

const emit = defineEmits(["update:modelValue"]);

watch(() => props.modelValue, (newV) => {
  if (!isNumber(newV)) return ;
  ptr.value = newV;
  emit("update:modelValue", newV);
});

function animate() {
  if (animating.value) return false;
  animating.value = true;
  setTimeout(() => animating.value = false, 1000);
  return true;
}

function slideTo(index: number) {
  if (!animate()) return;
  ptr.value = index;
}

watch(ptr, (newV, oldV) => {
  if (newV === oldV) return;
  if (!$slider.value) return;
  $slider.value.style.setProperty("--movedX", `-${props.width * newV}px`);
});

defineExpose({
  ptr, slideTo
});

</script>

<template>
  <div :class="[`w-[${props.width}px]`, `h-[${props.height}px]`, 'overflow-hidden', props.class]">
    <div ref="$slider" class="flex w-fit slider">
      <div :class="[`w-[${props.width}px]`, `h-[${props.height}px]`, 'p-3']" v-for="(game, idx) in games"
        :key="game.id">
        <div class="board cursor-pointer w-full h-full rounded-xl p-10" @click="router.push(`/game/${game.title}`)">
          <h1 class="title text-purple-500 text-5xl text-center font-semibold">{{ game.name }}</h1>
          <hr class="hr my-5">
          <p class="description font-medium text-3xl">
            {{ game.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider {
  --movedX: 0;

  transition: 1s;
  transform: translateX(var(--movedX));
}

.board {
  transition: .2s;
  @apply bg-gray-100;
  &:hover {
    @apply bg-purple-800
  }

  &:hover .description {
    @apply text-white
  }
}
</style>