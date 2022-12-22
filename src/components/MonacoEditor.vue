<template>
  <div :class="class" :id="`monaco-editor-${id}`" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRaw } from 'vue';
import { editor } from 'monaco-editor';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

type PropsType = {
  id: string,
  class?: string,
};
const props = defineProps<PropsType>();

onMounted(() => {
  theEditor.value = editor.create(document.getElementById(`monaco-editor-${props.id}`)!, {
    value: "",
    language: "text",
    automaticLayout: true,
    theme: 'vs',
    fontFamily: "Consolas",
  });
});

onUnmounted(() => {
  if (theEditor.value) toRaw(theEditor.value).dispose();
});

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  }
};

const theEditor = ref<editor.IStandaloneCodeEditor>();

const setLang = (lang: string) => {
  if (!theEditor.value) return ;
  const model = theEditor.value.getModel();
  if (!model) return ;

  editor.setModelLanguage(model, lang);
};

const getContent = () => {
  if (!theEditor.value) return "";

  return toRaw(theEditor.value).getValue();
};

const setContent = (content: string) => {
  if (!theEditor.value) return ;
  
  toRaw(theEditor.value).setValue(content);
};

defineExpose({
  setLang,
  getContent,
  setContent,
});

</script>

<style scoped lang="scss">
</style>