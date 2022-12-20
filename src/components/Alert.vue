<template>
  <div class="fixed w-80 h-screen z-50 left-0 top-0 pt-24 pl-4">
    <TransitionGroup>
      <div :key="alert.id" class="overflow-visible mb-2" v-for="alert in alerts">
        <div @click="remove(alert)" class="opacity-100 w-full h-fit rounded-lg p-3 inner text-white shadow-lg grid grid-cols-2 items-center"
          :class="{
            'bg-blue-500': alert.type === 'primary',
            'bg-red-600': alert.type === 'danger',
            'bg-green-600': alert.type === 'success',
            'bg-yellow-400': alert.type === 'warning',
          }"
        >
          <Icon :type="alert.type"/>
          {{ alert.message }}
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { nanoid } from 'nanoid';
import Icon from './Icon.vue';

type AlertType = "primary" | "success" | "danger" | "warning";

type IAlert = {
  id: string
  type: AlertType
  message: string
  timer: NodeJS.Timer | null
};

const alerts = ref<IAlert[]>([]);

const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });
};

const alert = (type: AlertType, message: string, ms: number = 1000) => {
  const newAlert: IAlert = {
    id: nanoid(11),
    type,
    message,
    timer: null,
  };
  alerts.value.unshift(newAlert);
  newAlert.timer = setTimeout(() => {
    remove(newAlert);
  }, 500 + ms);
};

const remove = (theAlert: IAlert) => {
  clearTimeout(theAlert.timer!);
  alerts.value = alerts.value.filter(alert => alert.id !== theAlert.id);
};

onMounted(async () => {
  for (let i = 0; i < 10; ++i) {
    await wait(1000);
    alert('primary', `Alert ${i}`, 2000);
  }
});

</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: 0.5s;
}

.v-enter-from,
.v-leave-to {
  @apply max-h-0 mb-0;
}

.v-enter-to,
.v-leave-from {
  @apply h-[48px] max-h-[48px];
}

@keyframes into {
  from {
    transform: translateX(-110%);
  }
  to {
    transform: translateX(0);
  }
}

.v-enter-active .inner {
  animation: 0.5s into;
}

.v-leave-active .inner {
  animation: 0.55s reverse into;
}
</style>