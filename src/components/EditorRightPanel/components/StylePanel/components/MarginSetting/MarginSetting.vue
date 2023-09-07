<template>
  <div class="margin-setting-wrapper">
    <div class="margin-label">边距</div>
    <div class="margin-content mb-2">
      <div class="margin-style">
        <div
          class="margin-item margin-item-all"
          :class="{ active: marginStyle === 'all' }"
          @click="handleSelect('all')"
        ></div>
        <div
          class="margin-item margin-item-custom"
          :class="{ active: marginStyle === 'custom' }"
          @click="handleSelect('custom')"
        >
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="margin-value" v-if="marginStyle === 'all'">
        <div class="flex">
          <div class="flex flex-col items-center mr-2">
            <el-input></el-input>
            <div class="pt-1">Margin</div>
          </div>
          <div class="flex flex-col items-center">
            <el-input></el-input>
            <div class="pt-1">Padding</div>
          </div>
        </div>
      </div>
    </div>
    <div class="margin-custom" v-if="marginStyle === 'custom'">
      <el-popover
        v-for="item in customMargin"
        placement="bottom-end"
        trigger="click"
      >
        <template #reference>
          <div :class="`custom-${item}`">
            <div>-</div>
          </div>
        </template>
        <el-input></el-input>
      </el-popover>
      <el-popover
        v-for="item in customPadding"
        placement="bottom-end"
        trigger="click"
      >
        <template #reference>
          <div :class="`custom-${item}`">
            <div>-</div>
          </div>
        </template>
        <el-input></el-input>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const marginStyle = ref('all');
const customMargin = [
  'margin-left',
  'margin-top',
  'margin-right',
  'margin-bottom',
];
const customPadding = [
  'padding-left',
  'padding-top',
  'padding-right',
  'padding-bottom',
];

const handleSelect = (value: string) => {
  marginStyle.value = value;
};
</script>

<style scoped lang="scss">
.margin {
  &-label {
    @apply mb-2;
  }

  &-content {
    @apply flex items-start;

    .radius-corner {
      @apply flex flex-col items-center;

      .corner {
        @apply block w-3 h-3 rounded-2px border-zinc-500;

        &.top-left {
          @apply border-l-2 border-t-2;
        }

        &.top-right {
          @apply border-r-2 border-t-2;
        }

        &.bottom-left {
          @apply border-l-2 border-b-2;
        }

        &.bottom-right {
          @apply border-r-2 border-b-2;
        }
      }

      &:not(:last-child) {
        @apply mr-2;
      }
    }
  }

  &-custom {
    @apply w-64 h-33 relative mt-2 mb-0 ml-auto mr-auto;
    background: url('@/assets/icons/other/margin-custom.svg');

    &:before,
    &:after {
      @apply absolute text-zinc-400 text-10px scale-80 font-400;
    }

    &:before {
      @apply left-0.5;
      content: 'Margin';
    }

    &:after {
      @apply left-14 top-7;
      content: 'Padding';
    }

    > div {
      @apply absolute min-h-3.5 min-w-10 p-0.5 flex items-center justify-center border border-solid border-transparent cursor-pointer text-12px rounded-2px;
      line-height: 0.8;

      &:hover {
        border-color: var(--el-color-primary);
      }

      &.custom {
        &-margin-left {
          @apply top-1/2 left-1 -translate-y-1/2;
        }

        &-margin-top {
          @apply left-1/2 top-1 -translate-x-1/2;
        }

        &-margin-right {
          @apply top-1/2 right-1 -translate-y-1/2;
        }

        &-margin-bottom {
          @apply left-1/2 bottom-1 -translate-x-1/2;
        }

        &-padding-left {
          @apply left-15 top-1/2 -translate-y-1/2;
        }

        &-padding-top {
          @apply top-8.5 left-1/2 -translate-x-1/2;
        }

        &-padding-right {
          @apply right-15 top-1/2 -translate-y-1/2;
        }

        &-padding-bottom {
          @apply bottom-8.5 left-1/2 -translate-x-1/2;
        }
      }
    }
  }

  &-value {
    @apply flex-1;
  }

  &-style {
    @apply flex w-4rem bg-zinc-100 rounded-1 mr-1;
  }

  &-item {
    @apply w-2rem h-2rem relative cursor-pointer overflow-hidden;

    &-all {
      &:before {
        @apply absolute w-3.5 h-3.5 border-2 border-zinc-600 border-solid rounded-2px left-1/2 top-1/2 -translate-1/2;
        content: '';
      }

      &.active {
        &:before {
          border-color: var(--el-color-primary);
        }
      }
    }

    &-custom {
      &.active {
        > div {
          &:before,
          &:after {
            background-color: var(--el-color-primary);
          }
        }
      }

      > div {
        @apply w-3.5 h-3.5 left-1/2 top-1/2 absolute -translate-1/2;

        &:before,
        &:after {
          @apply w-0.5 h-0.5 absolute block rounded-0.25 bg-zinc-400;
          content: '';
        }

        &:first-child {
          &:before {
            @apply left-0.75 top-0 w-2;
          }

          &:after {
            @apply top-0.75 left-0 h-2;
          }
        }

        &:last-child {
          &:before {
            @apply right-0.75 bottom-0 w-2;
          }

          &:after {
            @apply bottom-0.75 right-0 h-2;
          }
        }
      }
    }
  }
}
</style>
