<template>
  <div class="left-tabs-wrapper">
    <ul class="left-tabs-links">
      <li
        v-for="(item, index) in tabs"
        :key="index"
        class="left-tabs-link"
        :class="{ active: current === index }"
        @click="handleSelect(index)"
      >
        <a>
          <el-tooltip effect="dark" :content="item.name" placement="right">
            <SvgIcon class="icon" :name="item.icon" />
          </el-tooltip>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(['update:modelValue']);

watch(
  () => props.modelValue,
  (newValue: number) => {
    current.value = newValue;
  }
);

const tabs = [
  {
    icon: 'renderer',
    name: '组件',
  },
  {
    icon: 'outline',
    name: '大纲',
  },
];
const current = ref(props.modelValue);

const handleSelect = (index: number) => {
  current.value = index;
  emits('update:modelValue', index);
};
</script>

<style lang="scss" scoped>
.left-tabs-wrapper {
  @apply border-r border-r-zinc-100;
  flex: 0 0 48px;

  li {
    @apply relative flex;
    height: 48px;

    + li {
      margin-top: 10px;
    }

    &:hover {
      background-color: rgba(var(--el-color-primary-rgb), 0.1);
    }

    &.active {
      background-color: rgba(var(--el-color-primary-rgb), 0.1);
      &::before {
        @apply absolute;
        content: '';
        width: 3px;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: var(--el-color-primary);
      }

      .icon {
        color: var(--el-color-primary);
      }
    }

    a {
      @apply cursor-pointer flex items-center justify-center flex-1;
      font-size: 20px;

      .icon {
        color: #333;
        width: 48px;
        height: 48px;

        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
