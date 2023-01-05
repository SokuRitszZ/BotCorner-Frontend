<script setup lang="ts">
import "cropperjs/dist/cropper.min.css";
import "cropperjs/dist/cropper.min";
import TCropper from "cropperjs";
import { onMounted, ref } from "vue";

type PropsType = {
  defaultSrc: string
  class?: string
};
const props = defineProps<PropsType>();

const $input = ref<HTMLInputElement>();
const $img = ref<HTMLImageElement>();

const cropper = ref<TCropper>();

const emit = defineEmits(['crop']);

const crop = () => {
  if (cropper.value) {
    cropper.value.getCroppedCanvas({
      width: 100,
      height: 100,
    }).toBlob((data: any) => emit("crop", data));
  }
};

onMounted(() => {
  initCropper();
})

defineExpose({
  crop
});

const initCropper = () => {
  const options: TCropper.Options = {
    aspectRatio: 1 / 1,
    modal: false,
    background: false,
    cropBoxResizable: true,
    crop(e) { }
  }
  if ($img.value) {
    cropper.value = new TCropper($img.value, options);
  }
};

const handleChangeImg = () => {
  if (!$input.value) return ;
  const file = $input.value.files![0];
  if (!file.type) return ;
  if (!/image\/.*/.test(file.type)) return window._alert("danger", "文件必须是图片");
  const url = URL.createObjectURL(file);
  $img.value!.src = url;
  cropper.value!.destroy();
  initCropper();
}

</script>

<template>
  <div :class="props.class">
    <div class="w-full flex justify-center">
      <img ref="$img" :src="props.defaultSrc" alt="头像" class="w-[200px] h-[200px]">
    </div>
    <div>
      <label class="m-auto w-fit block mt-3 text-3xl bg-purple-400 hover:bg-purple-500 active:bg-purple-600 text-white cursor-pointer p-2 rounded-lg" for="avatar-input">选择图片</label>
      <input ref="$input" @change="handleChangeImg" class="hidden" type="file" id="avatar-input">
    </div>
  </div>
</template>

<style scoped lang="scss"></style>