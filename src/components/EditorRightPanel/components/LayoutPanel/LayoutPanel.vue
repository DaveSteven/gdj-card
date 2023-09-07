<template>
  <div class="absolute left-0 top-0 w-full h-full">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template #title>
          <div class="px-2 text-xs">布局</div>
        </template>
        <div class="py-2 px-3">
          <LayoutForm />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LayoutForm from './components/LayoutForm';

const activeNames = ref(['1']);
</script>
