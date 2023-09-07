<template>
  <div class="radius-setting-wrapper">
    <div class="radius-label">圆角</div>
    <div class="radius-content mb-2">
      <div class="radius-style">
        <div
          class="radius-item radius-item-all"
          :class="{ active: radiusStyle === 'all' }"
          @click="handleSelect('all')"
        ></div>
        <div
          class="radius-item radius-item-custom"
          :class="{ active: radiusStyle === 'custom' }"
          @click="handleSelect('custom')"
        ></div>
      </div>
      <div class="radius-value">
        <el-input :disabled="radiusStyle === 'custom'" />
      </div>
    </div>
    <div v-if="radiusStyle === 'custom'" class="radius-content">
      <div
        class="radius-corner"
        v-for="corner in radiusCorners"
        :key="corner.name"
      >
        <div class="mb-2">
          <el-input v-model="corner.value"></el-input>
        </div>
        <span class="corner" :class="corner.name"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const radiusStyle = ref('all');
const radiusCorners = [
  {
    name: 'top-left',
    value: '',
  },
  {
    name: 'top-right',
    value: '',
  },
  {
    name: 'bottom-left',
    value: '',
  },
  {
    name: 'bottom-right',
    value: '',
  },
];

const handleSelect = (value: string) => {
  radiusStyle.value = value;
};
</script>

<style scoped lang="scss">
.radius {
  &-label {
    @apply mb-2;
  }

  &-content {
    @apply flex items-center;

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

  &-value {
    @apply flex-1;
  }

  &-style {
    @apply flex w-4rem bg-zinc-100 rounded-1 mr-1;
  }

  &-item {
    @apply w-2rem h-2rem relative cursor-pointer overflow-hidden;

    &-all,
    &-custom {
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
      @apply border-l border-zinc-200 border-solid;

      &:after {
        @apply absolute z-1 text-zinc-100 left-1/2 top-1/2 -translate-1/2 font-900 block;
        content: '＋';
        font-size: 1.875rem;
      }
    }
  }
}
</style>
