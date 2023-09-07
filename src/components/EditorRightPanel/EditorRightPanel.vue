<template>
  <div class="editor-right-panel">
    <TabsLink v-model="current" />
    <div class="tabs-container">
      <transition v-show="current === 0" name="fade">
        <LayoutPanel />
      </transition>
      <transition v-show="current === 1">
        <StylePanel />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabsLink from './components/TabsLink';
import LayoutPanel from './components/LayoutPanel';
import StylePanel from './components/StylePanel';

const current = ref(0);
</script>

<style lang="scss" scoped>
.editor {
  &-right-panel {
    @apply flex flex-col z-10;
    box-shadow: -2px 0 20px 0 rgba(0, 0, 0, 0.1);
    flex: 0 0 auto;
    max-width: 600px;
    min-width: 17.5rem;
    width: 17.5rem;
  }
}
.tabs-container {
  @apply flex-1 relative;
}
</style>
