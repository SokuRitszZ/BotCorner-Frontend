<script setup lang="ts">
import SokuSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue';
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import { IUser } from '@/store/userStore';
import useCacheStore, { IBot } from '@/store/cacheStore';
import useGameStore from '@/store/gameStore';
import useMatchStore from '@/store/matchStore';
import { useRouter } from 'vue-router';

type IRecord = {
  uuid: string;
  bots: (IBot | null)[];
  gameId: number;
  users: IUser[];
};

type PropsType = {
  record: IRecord;
};

const props = defineProps<PropsType>();
const cacheStore = useCacheStore();
const gameStore = useGameStore();
const matchStore = useMatchStore();
const router = useRouter();

async function toWatch() {
  gameStore.uuidWatch = props.record.uuid;
  matchStore.usersMatch = props.record.users;
  while (matchStore.usersMatch.length < 4) matchStore.usersMatch.push(matchStore.usersMatch[0]);
  await router.push(`/game/intro/${props.record.gameId}`);
}
</script>

<template>
  <SokuSkeleton class="skeleton" :is-loading="false">
    <button @click="toWatch()" class="card">
      <h1 class="font-bold text-3xl text-center">
        {{ cacheStore.getGame(props.record.gameId).name || '未知' }}
      </h1>
      <div class="avatars">
        <SokuImgSkeleton
          v-for="u in props.record.users"
          :key="u.id"
          class="avatar"
          :url="u.avatar"
        />
      </div>
    </button>
  </SokuSkeleton>
</template>

<style scoped lang="scss">
.skeleton {
  @apply w-full h-[200px];
  @apply rounded-md;
  @apply overflow-hidden;
  .card {
    background-color: var(--bg-lg-c);

    @apply w-full h-full;
    .avatars {
      background-color: var(--bg-c);
      @apply flex justify-between items-center;
      @apply w-[200px];
      @apply p-1 mx-auto;
      @apply rounded-full;

      .avatar {
        @apply w-[40px] h-[40px];
        @apply rounded-full;
        @apply overflow-hidden;
      }
    }
  }
}
</style>
