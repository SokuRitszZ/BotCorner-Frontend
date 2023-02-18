<script setup lang="ts">
import { nextTick, ref } from 'vue';
import SokuWindow from './SokuWindow.vue';
import SokuButton from './SokuButton.vue';
import dayjs from 'dayjs';

const $window = ref();
const $input = ref<HTMLInputElement>();
const $container = ref<HTMLDivElement>();

const emit = defineEmits(['send']);

const showWindow = () => {
  $window.value.open();
};

const send = () => {
  emit('send', $input.value!.value);
  $input.value!.value = '';
};

const addMessage = (message: IMessage) => {
  messages.value.push(message);
  nextTick().then(() => {
    $container.value?.scrollTo({
      top: $container.value.scrollHeight,
    });
  });
  if ($window.value.getStatus() === 'zooming') $window.value.act();
};

defineExpose({
  addMessage,
});

type IMessage = {
  id: string;
  content: string;
  time: Date;
} & (
  | {
      type: 'notification';
    }
  | {
      type: 'talk';
      sender: string;
    }
);

const messages = ref<IMessage[]>([]);
</script>

<template>
  <div>
    <soku-button class="text-4xl p-3" @click="showWindow" type="normal"
      >聊天窗口</soku-button
    >
    <soku-window ref="$window" title="Chat Chat" class="z-50">
      <div class="h-full">
        <div ref="$container" class="message-window overflow-scroll text-start">
          <div v-for="(message, index) in messages" :key="message.id">
            <div></div>
            <div
              v-if="
                index === 0 ||
                dayjs(messages[index - 1].time).format('YYYYMMDDhh-mm') !==
                  dayjs(messages[index].time).format('YYYYMMDDhh-mm')
              "
              class="bg-gray-700 opacity-60 m-auto w-fit text-white px-2 rounded-full"
            >
              {{ dayjs(message.time).format('YYYY-MM-DD hh:mm:ss') }}
            </div>
            <div
              v-if="message.type === 'talk'"
              class="bg-purple-300 mt-3 p-4 mx-2 rounded-xl"
            >
              <div class="text-gray-700 flex items-center justify-between">
                <div>{{ message.sender }}</div>
                <div>
                  {{ dayjs(message.time).format('YYYY-MM-DD hh:mm:ss') }}
                </div>
              </div>
              <div>
                {{ message.content }}
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-[50px] p-2 px-5 flex items-center gap-2">
          <input
            @keyup.enter="send"
            ref="$input"
            type="text"
            class="w-full h-full rounded-lg outline-none px-2"
          />
          <soku-button
            @click="send"
            type="normal"
            class="whitespace-nowrap px-3 py-1"
            >发送</soku-button
          >
        </div>
      </div>
    </soku-window>
  </div>
</template>

<style scoped lang="scss">
.message-window {
  height: calc(100% - 50px);
}
</style>
