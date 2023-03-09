<template>
  <!-- eslint-disable-next-line vue/no-parsing-error -->
  <div :class="class">
    <div
      v-if="records.length === 0"
      class="text-purple-400 text-xl text-center"
    >
      似乎还没有任何比赛
    </div>
    <div
      v-else
      class="bg-purple-700 p-3 w-full rounded-xl"
      :class="{ 'mt-3': index > 0 }"
      :key="record.id"
      v-for="(record, index) in records"
    >
      <div class="text-gray-400 ml-3 flex justify-between">
        <div>
          {{ dayjs(record.time).format('YYYY-MM-DD hh:mm:ss') }}
        </div>
        <div>
          {{ record.result }}
        </div>
      </div>
      <div class="grid grid-cols-5 gap-3 items-center">
        <div class="col-span-4 flex justify-center gap-2 flex-wrap">
          <div
            :key="user.id"
            v-for="(user, index) in record.users"
            class="flex justify-around gap-3 items-center text-sm p-1 rounded-lg border-2 border-purple-900"
            :class="{
              'bg-purple-900': record.reason.split(',')[index] === '',
            }"
          >
            <ImageHoverDetail
              :src="user.avatar"
              class="col-span-2 w-5 h-5 rounded-full"
            >
              {{ record.users[index].username }}#{{
                leftpad(8, record.users[index].id)
              }}
            </ImageHoverDetail>
            <div
              class="w-fit overflow-hidden whitespace-nowrap text-white justify-end"
            >
              {{ record.titles[index] }}
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <Icon
            @click="play(record.id)"
            class="cursor-pointer transition text-purple-400 hover:text-purple-500 active:text-purple-600"
            type="play"
            :size="32"
          />
        </div>
      </div>
    </div>
    <div class="mt-3 p-3 bg-purple-700 rounded-xl flex justify-center">
      <Pager
        @change-page="changePage"
        :max="Math.ceil(recordCount / capacity)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getRecordCountApi,
  getRecordJsonApi,
  getRecordListApi,
} from '@/api/record';
import Icon from '@/components/BootstrapIcon.vue';
import ImageHoverDetail from '@/components/ImageHoverDetail.vue';
import useCacheStore, { IUser } from '@/store/cacheStore';
import useUserStore from '@/store/userStore';
import leftpad from '@/utils/leftpad';
import { onMounted, onUnmounted, ref } from 'vue';
import dayjs from 'dayjs';
import Pager from '@/components/SokuComponent/SokuPager.vue';
import { useRouter } from 'vue-router';

type IRecordListItem = {
  id: number;
  users: IUser[];
  titles: string[];
  result: string;
  reason: string;
  time: Date;
};
const records = ref<IRecordListItem[]>([]);
const recordCount = ref<number>(0);
const capacity = 5;
const router = useRouter();
const userStore = useUserStore();
const cacheStore = useCacheStore();

onMounted(() => {
  cacheStore.getGames.then(() => {
    gameId.value = cacheStore.getGameId(
      router.currentRoute.value.name!.toString()
    );
    getRecord(gameId.value, 0, capacity);
  });
});

const getRecord = (id: number, from: number, count: number) => {
  getRecordListApi(id, from, count)
    .then((data: any) => data.records)
    .then((list) => {
      records.value = list;
    });
  getRecordCountApi(id)
    .then((data: any) => data.count)
    .then((count) => (recordCount.value = count));
};

const gameId = ref<number>(0);

const changePage = (idx: number) => {
  getRecordListApi(gameId.value, idx * 5, 5)
    .then((data: any) => data.records)
    .then((list) => (records.value = list));
};

const emit = defineEmits(['play-record']);

const play = (id: number) => {
  getRecordJsonApi(id).then((data) => emit('play-record', data));
};

onUnmounted(() => {
  userStore.removeAfterLoginCallback('get record list');
});
</script>
