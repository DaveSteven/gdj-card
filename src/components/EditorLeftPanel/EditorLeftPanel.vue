<template>
  <div class="editor-left-panel">
    <LeftTabs v-model="current" />
    <div class="flex-1 relative">
      <transition name="fade">
        <RenderersPane class="absolute left-0 top-0 w-full h-full" v-show="current === 0" />
      </transition>
      <transition name="fade">
        <OutlinePane class="absolute left-0 top-0 w-full h-full" v-show="current === 1" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LeftTabs from './components/LeftTabs';
import RenderersPane from './components/RenderersPane';
import OutlinePane from './components/OutlinePane';

const current = ref(0);
</script>

<style lang="scss" scoped>
.editor {
  &-left-panel {
    @apply overflow-hidden flex;
    flex: 0 0 308px;
    box-shadow: 2px 0 20px 0 rgba(0, 0, 0, 0.1);
    z-index: 5;
  }
}
</style>
