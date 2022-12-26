<template>
  <div :class="props.class">
    <div class="bg-purple-700 p-3 w-full rounded-xl" :class="{ 'mt-3': index > 0 }"
      :key="record.id" v-for="(record, index) in records">
      <div class="text-gray-400 ml-3 flex justify-between">
        <div>
          {{ dayjs(record.time).format("YYYY-MM-DD hh:mm:ss") }}
        </div>
        <div>
          {{ record.reason }}
        </div>
      </div>
      <div class="flex justify-around items-center">
        <div :key="user.id" v-for="(user, index) in record.users"
          class="flex justify-around items-center text-xl p-1 rounded-lg border-2"
          :class="{ 
            'bg-red-800': index === 0 && record.result === '红蛇胜利', 
            'bg-blue-800': index === 1 && record.result === '蓝蛇胜利',
            'border-red-800': index === 0,
            'border-blue-800': index === 1,
            }">
          <ImageHoverDetail :src="user.headIcon" class="w-10 h-10 rounded-full" >
            {{ record.users[index].username }}#{{ leftpad(8, record.users[index].id) }}
          </ImageHoverDetail>
          <div class="text-white">
            {{ record.titles[index] }}
          </div>
        </div>
        <div>
          <Icon @click="play(record.id)" class="cursor-pointer transition text-purple-400 hover:text-purple-500 active:text-purple-600" type="play" :size="32"/>
        </div>
      </div>
    </div>
    <div class="mt-3 p-3 bg-purple-700 rounded-xl flex justify-center">
      <Pager @change-page="changePage" :max="Math.ceil(recordCount / capacity)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRecordCountApi, getRecordJsonApi, getRecordListApi } from '@/api/record';
import Icon from '@/components/Icon.vue';
import ImageHoverDetail from '@/components/ImageHoverDetail.vue';
import { IUser } from '@/store/cacheStore';
import useUserStore from '@/store/userStore';
import leftpad from '@/utils/leftpad';
import { onMounted, onUnmounted, ref } from 'vue';
import dayjs from "dayjs";
import Pager from '@/components/Pager.vue';

type PropsType = {
  class?: string;
  gameId: number;
};
type IRecordListItem = {
  id: number;
  users: IUser[];
  titles: string[];
  result: string;
  reason: string;
  time: Date;
};
const props = defineProps<PropsType>();
const records = ref<IRecordListItem[]>([]);
const recordCount = ref<number>(0);
const capacity = 5;
const userStore = useUserStore();

onMounted(() => {
  userStore.addAfterLoginCallback("get record list", () => {
    getRecordListApi(props.gameId, 0, 5)
      .then((data: any) => data.records)
      .then(list => records.value = list);
    getRecordCountApi(1)
      .then((data: any) => data.count)
      .then(count => recordCount.value = count);
      
    console.log(1);
  });
});

const changePage = (idx: number) => {
  userStore.addAfterLoginCallback("get record list", () => {
    getRecordListApi(props.gameId, idx, 5)
      .then((data: any) => data.records)
      .then(list => records.value = list);
  });
};

const emit = defineEmits(["play-record"]);

const play = (id: number) => {
  getRecordJsonApi(id)
    .then(data => emit("play-record", data));
}

onUnmounted(() => {
  userStore.removeAfterLoginCallback("get record list");
})

</script>

<style scoped lang="scss">

</style>