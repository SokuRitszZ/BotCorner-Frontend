<template>
  <button
    :disabled="props.disabled"
    @blur="() => (status = 'close')"
    @click="toggle"
    class="bg-white rounded-xl flex justify-between items-center p-4 relative overflow-visible"
    :class="props.class"
  >
    <div>
      {{ currentKey }}
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-caret-down-fill text-gray-500"
      viewBox="0 0 16 16"
    >
      <path
        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
      />
    </svg>
    <Transition>
      <div
        v-if="status === 'open'"
        class="rounded-xl absolute bg-white w-full min-h-[50px] max-h-72 left-0 top-0 translate-y-11 overflow-scroll z-50 border-[1px]"
      >
        <div
          @click="select(item)"
          v-for="item in list"
          :key="item.value"
          class="hover:bg-gray-200 p-3"
        >
          {{ item.key }}
        </div>
      </div>
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";

export type IEntry<T = number> = {
  key: string;
  value: T;
};

type PropsType = {
  class?: string;
  modelValue: any;
  list: IEntry<any>[];
  disabled?: boolean;
};
const props = defineProps<PropsType>();

type IStatus = "open" | "close";

const status = ref<IStatus>("close");

const toggle = () => {
  return (status.value = status.value === "close" ? "open" : "close");
};

const currentKey = ref<string>(
  (props.list[0] && props.list[0].key) || "这里没有任何选项"
);
const currentValue = ref<any>(props.modelValue);
// https://cn.vuejs.org/guide/components/events.html#usage-with-v-model
// defineProps(['modelValue']);
const emit = defineEmits(["update:modelValue"]);

const select = (item: IEntry<any>) => {
  currentKey.value = item.key;
  currentValue.value = item.value;
  emit("update:modelValue", item.value);
};
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: 0.2s;
}

.v-enter-from,
.v-leave-to {
  @apply translate-y-10 opacity-0;
}

.v-enter-to,
.v-leave-from {
  @apply translate-y-11 opacity-100;
}
</style>
