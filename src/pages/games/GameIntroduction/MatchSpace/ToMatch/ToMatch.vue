<script setup lang="ts">
import { IEntry } from '@/components/SokuComponent/SokuSelect.vue';
import useCacheStore from '@/store/cacheStore';
import useMatchStore from '@/store/matchStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const bots = ref<IEntry<number>[]>([{ key: '亲自出马', value: 0 }]);
const cacheStore = useCacheStore();
const route = useRoute();

onMounted(async () => {
  const botsGot = await cacheStore.getBots;
  bots.value.push(
    ...botsGot
      .filter((bot) => bot.gameId === +route.params.id)
      .map((bot) => ({ key: bot.title + '#' + bot.id, value: bot.id }))
  );
});

const matchStore = useMatchStore();

async function startGame() {
  matchStore.status = 'game-starting';
  matchStore.server!.sendMessage('start single game', {
    botIds: matchStore.idsBot.map((x) => x || 0),
  });
}

function startMatch() {
  matchStore.status = 'matching';
  matchStore.server!.sendMessage('start match', {
    botId: matchStore.idBotSelected || 0,
  });
  // 在 matching 页面必须写一个确认机制
}
</script>
<template>
  <div class="to-match">
    <h1 class="text-3xl font-thin">单人模式</h1>
    <hr />
    <main>
      <input
        v-model="matchStore.idsBot[idx]"
        v-for="(i, idx) in matchStore.idsBot"
        :key="idx"
        type="number"
        :placeholder="`${idx + 1}号BotID（0代表手动）`"
      />
      <button
        v-if="matchStore.idsBot.length > 1"
        @click="matchStore.minusIdBot"
        class="btn"
      >
        -
      </button>
      <button
        v-if="matchStore.idsBot.length < 4"
        @click="matchStore.addIdBot"
        class="btn"
      >
        +
      </button>
      <button @click="startGame" class="btn">开始游戏</button>
    </main>
    <h1 class="text-3xl font-thin mt-4">多人模式</h1>
    <hr />
    <main>
      <select
        v-model="matchStore.idBotSelected"
        name="idSelected"
        id="idSelected"
      >
        <option v-for="bot in bots" :key="bot.key" :value="bot.value">
          {{ bot.key }}
        </option>
      </select>
      <button @click="startMatch" class="btn">开始匹配</button>
    </main>
  </div>
</template>
<style scoped lang="scss">
@import url('./style.scss');
</style>
