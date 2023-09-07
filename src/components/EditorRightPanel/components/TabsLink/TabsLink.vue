<template>
  <div class="tabs-links-wrapper">
    <ul class="tabs-links">
      <li
        class="tabs-link"
        :class="{ active: current === index }"
        v-for="(item, index) in tabsData"
        :key="index"
        @click="handleSelect(index)"
      >
        <a :title="item.name">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(['update:modelValue']);

watch(
  () => props.modelValue,
  (newIndex: number) => {
    current.value = newIndex;
  }
);

const current = ref(props.modelValue);
const tabsData = [
  {
    name: '属性',
  },
  {
    name: '外观',
  },
  {
    name: '事件',
  },
];

const handleSelect = (index: number) => {
  current.value = index;
  emits('update:modelValue', index);
};
</script>

<style scoped lang="scss">
.tabs {
  &-links {
    @apply flex justify-around w-full;

    > li {
      @apply flex h-11 w-full relative;
      padding-right: 2px;

      &:last-child {
        padding-right: 0;
      }

      > a {
        @apply flex items-center justify-center w-full cursor-pointer text-xs border-b-2 border-b-white;
        padding-top: 2px;
      }

      &:not(:last-child):after {
        @apply absolute right-0 top-1/2 -translate-y-1/2;
        background-color: #d8d8d8;
        content: '';
        height: 12px;
        position: absolute;
        width: 1px;
      }

      &:hover {
        > a {
          color: var(--el-color-primary);
        }
      }

      &.active {
        > a {
          color: var(--el-color-primary);
          border-color: var(--el-color-primary);
        }
      }
    }

    &-wrapper {
      @apply flex;
    }
  }
}
</style>
