<template>
  <div class="border-setting-wrapper">
    <div class="border-label">边框</div>
    <div class="border-content">
      <div class="border-items">
        <div
          v-for="position in borderSettings"
          :key="position"
          class="border-item"
          :class="{
            active: curSelect === position,
            [`border-item-${position}`]: true,
          }"
          @click="handleSelect(position)"
        ></div>
      </div>
      <div class="border-setting">
        <div><el-select></el-select></div>
        <div class="flex items-center">
          <div class="mr-2">
            <el-select v-model="borderStyle">
              <el-option
                v-for="option in borderOptions"
                :value="option.value"
                :label="option.label"
              >
                <div class="option-item">
                  <div class="option-item-style" :class="option.value"></div>
                  <div>{{ option.label }}</div>
                </div>
              </el-option>
            </el-select>
          </div>
          <el-color-picker v-model="borderColor" show-alpha />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const borderStyle = ref('solid');
const borderColor = ref('rgba(0, 0, 0, 0)');
const borderSettings = ['left', 'top', 'right', 'bottom', 'all'];
const borderOptions = [
  {
    label: '实线',
    value: 'solid',
  },
  {
    label: '虚线',
    value: 'dashed',
  },
  {
    label: '点线',
    value: 'dotted',
  },
];
const curSelect = ref('all');

const handleSelect = (position: string) => {
  curSelect.value = position;
};
</script>

<style scoped lang="scss">
.border {
  &-label {
    @apply mb-2;
  }

  &-content {
    @apply flex;
  }

  &-setting {
    @apply flex flex-col justify-between;
  }

  &-items {
    @apply bg-zinc-100 rounded-1 relative mr-3;
    flex: 0 0 72px;
    height: 72px;
  }

  &-item {
    @apply absolute w-3.5 h-3.5 border-2 border-solid border-zinc-300 cursor-pointer;

    &:not(:last-child):after {
      @apply absolute bg-zinc-500;
      content: '';
    }

    &-left,
    &-right,
    &-top,
    &-bottom {
      &.active {
        &:after {
          background-color: var(--el-color-primary);
        }
      }
    }

    &-left,
    &-right {
      top: 50%;
      transform: translateY(-50%);

      &:after {
        width: 2px;
        top: -2px;
        bottom: -2px;
      }
    }

    &-left {
      left: 5px;

      &:after {
        left: -2px;
      }
    }

    &-right {
      right: 5px;

      &:after {
        right: -2px;
      }
    }

    &-top,
    &-bottom {
      left: 50%;
      transform: translateX(-50%);

      &:after {
        height: 2px;
        left: -2px;
        right: -2px;
      }
    }

    &-top {
      top: 5px;

      &:after {
        top: -2px;
      }
    }

    &-bottom {
      bottom: 5px;

      &:after {
        bottom: -2px;
      }
    }

    &-all {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      &.active {
        border-color: var(--el-color-primary);
      }
    }
  }
}

.option-item {
  @apply flex items-center;

  &-style {
    @apply flex-1 h-1px border mr-1 border-black;

    &.solid {
      @apply border-solid;
    }

    &.dotted {
      @apply border-dotted;
    }

    &.dashed {
      @apply border-dashed;
    }
  }
}
</style>
