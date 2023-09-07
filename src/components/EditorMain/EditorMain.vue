<template>
  <div class="editor-main">
    <div class="editor-preview">
      <div class="editor-preview-body">
        <div
          ref="previewRef"
          id="previewInner"
          class="editor-preview-inner"
        ></div>
        <div ref="highlightRef" class="highlight-body"></div>
        <div ref="focusRef" class="focus-body"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createFocusNode, createHighlightNode } from '@/utils/preview';
import { NodeMap, nodeArrayToVNode } from '@/utils/renderer';
import { nextTick, onMounted, render, watch } from 'vue';
import { ref } from 'vue';
import { useNodeStore } from '@/stores';
import { storeToRefs } from 'pinia';

const previewRef = ref();
const highlightRef = ref();
const focusRef = ref();

const nodeStore = useNodeStore();
const { focusUid, nodeMap } = storeToRefs(nodeStore);

watch(
  () => focusUid.value,
  (newId) => {
    nextTick(() => {
      setTimeout(() => {
        const target = previewRef.value!.querySelector(`#${newId}`);
        if (target) {
          const focusVNode = createFocusNode(target);
          render(focusVNode, focusRef.value);
        }
      }, 20);
    });
  }
);

watch(
  () => nodeMap.value,
  (newData: NodeMap) => {
    const VNode = nodeArrayToVNode(Object.values(newData), undefined);
    render(VNode, previewRef.value!);
  },
  {
    deep: true,
  }
);

onMounted(() => {
  previewRef.value.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'previewInner') return;
    nodeStore.setFocusUid(target.id);
  });
  previewRef.value.addEventListener('mouseover', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'previewInner') return;
    const highlightVNode = createHighlightNode(target);
    render(highlightVNode, highlightRef.value!);
  });
  previewRef.value.addEventListener('mouseleave', () => {
    render(null, highlightRef.value!);
  });
});
</script>

<style lang="scss" scoped>
.editor {
  &-main {
    @apply flex-1 flex flex-col bg-zinc-100;
    flex: 1 1 auto;
    min-width: 0;
    z-index: 0;
  }

  &-preview {
    @apply flex;
    flex-grow: 1;
    overflow: hidden;
    transform: scale(1);
    transform-origin: center top;
    overflow: auto;

    &-body {
      @apply bg-white relative;
      width: 375px;
      height: 667px;
      margin: 40px auto;
    }

    &-inner,
    .highlight-body,
    .focus-body {
      @apply absolute left-0 top-0 w-full h-full;
    }

    .highlight-body,
    .focus-body {
      pointer-events: none;
    }
  }
}
</style>
