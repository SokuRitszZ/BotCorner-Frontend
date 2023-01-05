<script setup lang="ts">
import { ref, toRaw } from 'vue';

type PropsType = {
  title?: string
};
const props = defineProps<PropsType>();

const shouldMove = ref<boolean>(false);
const offset = ref<{x: number, y: number}>({x: 0, y: 0});
const $window = ref<HTMLDivElement>();
const $body = ref<HTMLDivElement>();

const handleMouseDown_move = (e: MouseEvent) => {
  shouldMove.value = true;
  offset.value = {
    x: e.offsetX,
    y: e.offsetY,
  }
};

window.addEventListener("mousemove", (e) => {
  if (!$window.value) return ;
  if (!shouldMove.value) return ;
  $window.value.style.setProperty("--movedX", `${e.clientX - offset.value.x}px`);
  $window.value.style.setProperty("--movedY", `${e.clientY - offset.value.y}px`);
});

window.addEventListener("mouseup", (e) => {
  shouldMove.value = false;
});

const shouldResize = ref<boolean>(false);

const handleMouseDown_resize = (e: MouseEvent) => {
  shouldResize.value = true;
};

window.addEventListener("mousemove", (e) => {
  if (!$window.value || !shouldResize.value) return ;
  $window.value.style.setProperty("width", `${e.clientX - $window.value.getBoundingClientRect().left}px`)
  if (status.value === "zooming") return ;
  $window.value.style.setProperty("height", `${e.clientY - $window.value.getBoundingClientRect().top}px`);
});

window.addEventListener("mouseup", (e) => {
  shouldResize.value = false;
});

const shouldShow = ref<boolean>(true);

const open = () => {
  if (status.value !== "hidden") return ;
  status.value = "open";
  emit("open");
}

const close = () => {
  if (status.value === "hidden") return ;
  status.value = "hidden";
  $window.value?.classList.remove("active");
  emit("close");
};

const backup_height = ref<string>();
const status = ref<"open" | "zooming" | "hidden">("hidden");
const isActive = ref<boolean>(false);

const emit = defineEmits(["open", "fold", "unfold", "enactive", "dis-enactive", "close"])

const zoom = () => {
  if (!$window.value) return ;
  if (status.value === "zooming") {
    status.value = "open";
    $window.value.style.setProperty("height", backup_height.value!);
    unact();
    emit("unfold");
  } else {
    status.value = "zooming";
    backup_height.value = $window.value.style.height;
    $window.value.style.setProperty("height", "32px");
    emit("fold");
  }
}

const act = () => {
  if (isActive.value) return ;
  isActive.value = true;
  $window.value?.classList.add("active");
  emit("enactive");
};

const unact = () => {
  if (!isActive.value) return ;
  isActive.value = false;
  $window.value?.classList.remove("active");
  emit("dis-enactive");
};

const getStatus = () => {
  return status.value;
};

defineExpose({
  open,
  close,
  zoom,
  act,
  unact,
  getStatus,
});
</script>

<template>
  <Transition>
    <div v-show="status !== 'hidden'" ref="$window" class="window fixed min-w-[100px] shadow-2xl rounded-xl">
      <!-- header -->
      <div @mousedown="handleMouseDown_move"
        class="select-none p-1 px-4 rounded-t-xl bg-purple-700 flex justify-between items-center">
        <span class="text-white">
          {{props.title || "TITLE"}}
        </span>
        <div class="flex justify-end gap-2">
          <button @click.stop="zoom" class="rounded-full p-2 bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500" />
          <button @click.stop="close" class="rounded-full p-2 bg-red-700 hover:bg-red-800 active:bg-red-900" />
        </div>
      </div>
      <!-- body -->
      <div ref="$body" class="body w-full bg-purple-200 overflow-scroll">
        <slot></slot>
      </div>
      <!-- footer -->
      <div class="w-full h-[18px] rounded-b-xl bg-purple-400 flex justify-end overflow-hidden">
        <div @mousedown="handleMouseDown_resize" class="p-2 cursor-se-resize"></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@keyframes shaking {
  from {
    transform: translateX(-25px);
  }
  3% { 
    transform: translateX(20px);
  }
  6% { 
    transform: translateX(-15px);
  }
  9% { 
    transform: translateX(10px);
  }
  12% { 
    transform: translateX(-5px);
  }
  15% {
    transform: none;
  }
  to {
    transform: none;
  }
}

.active {
  animation: 3s shaking infinite;
}

.window {
  --movedX: 100px;
  --movedY: 100px;
  
  top: var(--movedY);
  left: var(--movedX);
  
  width: 300px;
  height: 400px;

  transition: .4s;

  &:active {
    transition: none;
  }

  .body {
    height: calc(100% - 32px - 18px);
  }
}

.v-enter-active,
.v-leave-active {
  transition: .4s; 
}
.v-enter-from,
.v-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.v-enter-to,
.v-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>