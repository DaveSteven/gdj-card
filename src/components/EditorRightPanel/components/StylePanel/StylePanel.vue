<template>
  <div class="absolute left-0 top-0 w-full h-full">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template #title>
          <div class="px-2 text-xs">自定义样式</div>
        </template>
        <div class="py-2 px-3">
          <BorderSetting class="mb-3" />
          <BorderRadiusSetting class="mb-3" />
          <MarginSetting class="mb-3" />
          <BackgroundSetting />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BorderSetting from './components/BorderSetting';
import BorderRadiusSetting from './components/BorderRadiusSetting';
import MarginSetting from './components/MarginSetting';
import BackgroundSetting from './components/BackgroundSetting';

const activeNames = ref(['1']);
</script>
