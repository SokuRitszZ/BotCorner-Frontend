<template>
  <div class="fixed w-80 h-fit z-50 left-0 top-24 pl-4">
    <TransitionGroup>
      <div :key="alert.id" class="overflow-visible mb-2" v-for="alert in alerts">
        <div @click="remove(alert)" class="opacity-100 w-full h-fit rounded-lg p-3 inner text-white shadow-lg flex gap-5 justify-between items-center"
          :class="{
            'bg-blue-500': alert.type === 'primary',
            'bg-red-600': alert.type === 'danger',
            'bg-green-600': alert.type === 'success',
            'bg-yellow-400': alert.type === 'warning',
          }"
        >
          <Icon :type="alert.type" :size="20"/>
          <div class="overflow-scroll whitespace-nowrap">
            {{ alert.message }}
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { nanoid } from 'nanoid';
import Icon from './Icon.vue';
import { AlertFunction, AlertType, IAlert } from '@/utils/alert';

const alerts = ref<IAlert[]>([]);

const alert: AlertFunction = (type: AlertType, message: string, ms: number = 1000) => {
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

// const test = (ms: number) => {
//   setInterval(() => {
//     alert("primary", "For test", ms);
//   }, 1000);
// }

onMounted(() => {
  window._alert = alert;
  // test(5000);
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
  @apply max-h-[48px];
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