<template>
  <div class="p-3">
    <h4 class="mb-3">组件</h4>
    <div class="renderer-list">
      <div
        class="renderer-item"
        v-for="(item, index) in rendererList"
        :key="index"
        @click="handleInsert(item)"
      >
        <div class="icon-box">
          
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="help">
          <div class="i-mdi:help-circle-outline"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BaseNode,
  createNode,
  generateRandomId,
} from '@/utils/renderer';
import { useNodeStore } from '@/stores';
import { storeToRefs } from 'pinia';

const nodeStore = useNodeStore();
const { currentUid } = storeToRefs(nodeStore);

const rendererList = [
  {
    name: '容器',
    // icon: 'i-material-symbols:crop-landscape-outline',
    type: 'container',
  },
  {
    name: 'span',
    // icon: 'i-material-symbols:text-ad-outline',
    type: 'span',
  },
  {
    name: 'text',
    // icon: 'i-material-symbols:format-color-text',
    type: 'text',
  },
  {
    name: 'img',
    // icon: 'i-material-symbols:image-outline-rounded',
    type: 'img',
  },
];

const handleInsert = (data: any) => {
  const uid = generateRandomId();
  const node: BaseNode = createNode(uid, data.type, currentUid.value);
  nodeStore.setFocusUid(uid);
  nodeStore.setNodeMap(uid, node);
};
</script>

<style scoped lang="scss">
.renderer-list {
  @apply flex flex-wrap justify-between;

  .renderer-item {
    @apply px-1 flex items-center justify-center border border-solid border-zinc-150 rounded-1 mb-2 cursor-pointer;
    flex: 0 0 112px;
    height: 32px;
    width: 112px;
    padding: 0 8px;
    color: #444;
    font-size: 18px;

    &:hover {
      border-color: var(--el-color-primary);

      .help {
        display: flex;
      }
    }

    .icon-box {
      @apply justify-center;
      width: 16px;
      height: 16px;
    }

    .name {
      @apply text-ellipsis overflow-hidden flex-auto;
      padding: 0 8px;
      white-space: nowrap;
      max-width: 80px;
      font-size: 12px;
    }

    .help {
      @apply display-none;
      flex: 0 0 16px;
    }
  }
}
</style>
