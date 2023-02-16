<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        type="button"
        @click="() => (isShown = !isShown)"
        @blur="() => (isShown = false)"
        class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {{ current }}
        <!-- Heroicon name: mini/chevron-down -->
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <Transition>
      <div
        v-show="isShown"
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <div
            @click="setCurrent(option)"
            v-for="option in options"
            :key="option"
            class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  options: {
    type: Array<string>,
    default: [],
  },
  title: {
    type: String,
    default: "Options",
  },
});

const emit = defineEmits(["change"]);

const isShown = ref<boolean>(false);

const current = ref<string>(props.title);

const setCurrent = (value: string) => {
  current.value = value;
  emit("change", value);
};

const getCurrent = () => {
  return current.value;
};

defineExpose({
  getCurrent,
});
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  @apply transition ease-out duration-100;
}

.v-enter-from,
.v-leave-to {
  @apply transform opacity-0 scale-95;
}

.v-enter-to,
.v-leave-from {
  @apply transform opacity-100 scale-100;
}
</style>
