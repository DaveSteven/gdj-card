<template>
  <el-config-provider>
    <div class="editor-header">
      <h2>光大家卡片可视化编辑器</h2>
    </div>
    <div class="editor-container">
      <EditorLeftPanel />
      <EditorMain />
      <EditorRightPanel />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import EditorLeftPanel from '@/components/EditorLeftPanel';
import EditorRightPanel from '@/components/EditorRightPanel';
import EditorMain from '@/components/EditorMain';
</script>

<style lang="scss">
#app {
  @apply w-screen h-screen overflow-hidden flex flex-col;
}

.editor {
  &-header {
    @apply flex justify-between p-4 border-b border-b-solid border-b-zinc-200;
  }

  &-container {
    @apply flex-1 flex overflow-hidden;
  }
}
</style>
