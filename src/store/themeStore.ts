import { defineStore } from "pinia";
import { nextTick, onMounted, ref, watch } from "vue";

const useThemeStore = defineStore('ThemeStore', () => {
  const themesAvailable = [{
    class: 'default',
    title: '浅色',
  }, {
    class: 'dark',
    title: '深色',
  }];
  const themeCurrent = ref<string>(localStorage.getItem('theme') || 'default');

  onMounted(() => {
    document.body.classList.add(themeCurrent.value);
  });

  watch(themeCurrent, (newV, oldV) => {
    localStorage.setItem('theme', newV);
    changeTheme(newV, oldV);
  });

  async function changeTheme(theme: string, old?: string) {
    document.body.classList.add('--change-theme-transition');
    await nextTick();
    if (old) document.body.classList.remove(old);
    document.body.classList.add(theme);
    setTimeout(() => {
      document.body.classList.remove('--change-theme-transition');
    }, 1500);
  }

  return {
    themesAvailable,
    themeCurrent,
    changeTheme,
  }
});

export default useThemeStore;