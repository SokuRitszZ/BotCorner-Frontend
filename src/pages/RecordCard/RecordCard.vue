<script setup lang="ts">
import SokuSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue';
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import { IUser } from '@/store/userStore';
import dayjs from 'dayjs';
import useCacheStore from '@/store/cacheStore';
import { getRecordJsonApi } from '@/api/record';
import useGameStore from '@/store/gameStore';
import { useRouter } from 'vue-router';
import useMatchStore from '@/store/matchStore';
import emoji from '@/utils/emoji';

type IRecord = {
  id: number;
  gameId: number;
  reason: string;
  result: string;
  time: string;
  titles: string[];
  users: IUser[];
};

type PropsType = {
  record: IRecord;
};

const props = defineProps<PropsType>();
const gameStore = useGameStore();
const router = useRouter();
const cacheStore = useCacheStore();
const matchStore = useMatchStore();

async function play() {
  const data = await getRecordJsonApi(props.record.id);
  gameStore.record = data as any;
  matchStore.usersMatch = props.record.users;
  await router.push(`/game/intro/${props.record.gameId}`);
}
</script>

<template>
  <SokuSkeleton :is-loading="false">
    <button @click="play" class="record-card">
      <h1 class="font-bold text-3xl text-center">
        {{ emoji[props.record.gameId - 1]
        }}{{ cacheStore.getGame(props.record.gameId).name }}
      </h1>
      <div class="avatars">
        <SokuImgSkeleton class="avatar" :url="props.record.users[0].avatar" />
        {{ props.record.result }}
        <SokuImgSkeleton class="avatar" :url="props.record.users[1].avatar" />
      </div>
      <div class="time">
        {{ dayjs(props.record.time).format('YYYY-MM-DD hh:mm:ss') }}
      </div>
    </button>
  </SokuSkeleton>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
