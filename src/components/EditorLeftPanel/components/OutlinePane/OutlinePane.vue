<template>
  <div class="outline-wrapper">
    <h4 class="outline-label">大纲</h4>
    <div class="tree-wrapper">
      <el-tree
        :data="tree"
        node-key="uid"
        :current-node-key="currentUid"
        default-expand-all
        highlight-current
        :expand-on-click-node="false"
        @node-click="nodeClick"
        @node-contextmenu="handleContextmenu"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NodeMap, NodeTree, nodeArrayToTree } from '@/utils/renderer';
import { ref, watch, render, h, onMounted } from 'vue';
import { useNodeStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { createContextMenu } from './components/ContextMenu/ContextMenu';

const tree = ref<NodeTree[]>();
const nodeStore = useNodeStore();
const { currentUid, nodeMap } = storeToRefs(nodeStore);
const menuOpened = ref(false);

watch(
  () => nodeMap.value,
  (newData: NodeMap) => {
    tree.value = formatTreeData(newData);
  },
  {
    deep: true,
  }
);

const formatTreeData = (data: NodeMap) => {
  return nodeArrayToTree(Object.values(data), undefined);
};

const nodeClick = (node: NodeTree): void => {
  nodeStore.setCurrentUid(node.uid);
  nodeStore.setFocusUid(node.uid);
};

const handleContextmenu = (event: MouseEvent, data, node, component) => {
  const contextmenu = createContextMenu();
  document.body.appendChild(contextmenu.vm.$el);
};
</script>

<style scoped lang="scss">
.outline-wrapper {
  @apply p-3;

  .outline-label {
    @apply mb-3;
  }

  .tree-wrapper {
    @apply relative;
  }
}
</style>
