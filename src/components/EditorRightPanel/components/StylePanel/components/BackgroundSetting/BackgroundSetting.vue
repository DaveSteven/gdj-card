<template>
  <div class="background-setting-wrapper">
    <div class="background-label">背景</div>
    <div class="background-setting">
      <div class="el-input" @click="toggleColorPicker">
        <div class="el-input__wrapper color-picker-wrapper">
          <el-color-picker
            ref="colorPickerRef"
            v-model="backgroundColor"
            color-format="hex"
            show-alpha
          />
          <div class="color-picker-input">
            <div>{{ backgroundColor }}</div>
          </div>
          <span class="color-picker-arrow" :class="{ open: opened }">
            <SvgIcon name="right-arrow-bold" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElColorPicker } from 'element-plus';

const colorPickerRef = ref<InstanceType<typeof ElColorPicker>>();
const backgroundColor = ref('rgba(0, 0, 0, 0)');
const opened = ref(false);

const toggleColorPicker = () => {
  opened.value = !opened.value;
  if (opened.value) {
    colorPickerRef.value?.show();
  } else {
    colorPickerRef.value?.hide();
  }
};
</script>

<style scoped lang="scss">
.background {
  &-label {
    @apply mb-2;
  }
  
  &-setting {
    .color-picker {
      &-wrapper {
        @apply cursor-pointer;
      }

      &-input {
        @apply flex flex-1 ml-2 max-w-full overflow-hidden w-auto;
      }

      &-arrow {
        @apply flex items-center justify-center text-center rotate-90 w-4 transition-all;
        > svg {
          @apply text-zinc-400 top-0 relative w-2.5 h-2.5;
        }

        &.open {
          @apply rotate-270;
        }
      }
    }
  }
}
</style>
