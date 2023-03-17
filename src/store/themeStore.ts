import { defineStore } from 'pinia';
import { nextTick, onMounted, ref, watch } from 'vue';

const useThemeStore = defineStore('ThemeStore', () => {
  const themesAvailable = [
    {
      class: 'default',
      title: '浅色',
    },
    {
      class: 'dark',
      title: '深色',
    },
    {
      class: 'spotify',
      title: 'Spotify',
    },
  ];
  const themeCurrent = ref<string>(localStorage.getItem('theme') || 'default');

  onMounted(() => {
    document.body.classList.add(themeCurrent.value);
  });

  watch(themeCurrent, (newV, oldV) => {
    localStorage.setItem('theme', newV);
    changeTheme(newV, oldV);
  });

  const timerChanging = ref<any>();

  async function changeTheme(theme: string, old?: string) {
    if (old) document.body.classList.remove(old);
    document.body.classList.add('--change-theme-transition');
    document.body.classList.add(theme);
    timerChanging.value = setTimeout(() => {
      document.body.classList.remove('--change-theme-transition');
      timerChanging.value = null;
    }, 1000);
  }

  return {
    themesAvailable,
    themeCurrent,
    changeTheme,
    timerChanging,
  };
});

export default useThemeStore;
