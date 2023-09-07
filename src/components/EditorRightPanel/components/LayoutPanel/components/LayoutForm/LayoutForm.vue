<template>
  <el-form label-width="120px" label-position="left">
    <div class="mb-6">
      <FlexSettingControl />
      <el-form-item v-for="(item, index) in layoutForm" :key="index" :label="item.label">
        <div class="w-full text-right">
          <template v-if="item.type === 'switch'">
            <el-switch></el-switch>
          </template>
          <template v-else-if="item.type === 'input-number'">
            <el-input>
              <template #append>
                <el-select v-model="item.optionValue" style="width: 60px">
                  <el-option v-for="option in item.options" :value="option.name"></el-option>
                </el-select>
              </template>
            </el-input>
          </template>
        </div>
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { useNodeStore } from '@/stores';
import { storeToRefs } from 'pinia';
import FlexSettingControl from '../FlexSettingControl';

const nodeStore = useNodeStore();
const { nodeMap, focusUid } = storeToRefs(nodeStore);

const layoutForm = [
  {
    label: '自动换行',
    type: 'switch',
    value: false,
  },
  {
    label: '撑满剩余空间',
    type: 'switch',
    value: false,
  },
  {
    label: '宽度',
    type: 'input-number',
    value: '100',
    optionValue: '%',
    options: [
      {
        name: 'px',
      },
      {
        name: 'rpx',
      },
      {
        name: '%',
      },
    ],
  },
  {
    label: '高度',
    type: 'input-number',
    value: '100',
    optionValue: '%',
    options: [
      {
        name: 'px',
      },
      {
        name: 'rpx',
      },
      {
        name: '%',
      },
    ],
  },
  {
    label: '最小宽度',
    type: 'input-number',
    value: '100',
    optionValue: '%',
    options: [
      {
        name: 'px',
      },
      {
        name: 'rpx',
      },
      {
        name: '%',
      },
    ],
  },
  {
    label: '最小高度',
    type: 'input-number',
    value: '100',
    optionValue: '%',
    options: [
      {
        name: 'px',
      },
      {
        name: 'rpx',
      },
      {
        name: '%',
      },
    ],
  },
  {
    label: '最大高度',
    type: 'input-number',
    value: '100',
    optionValue: '%',
    options: [
      {
        name: 'px',
      },
      {
        name: 'rpx',
      },
      {
        name: '%',
      },
    ],
  },
  {
    label: '最大高度',
    type: 'input-number',
    value: '100',
    optionValue: '%',
    options: [
      {
        name: 'px',
      },
      {
        name: 'rpx',
      },
      {
        name: '%',
      },
    ],
  },
];
// const setLayout = (layout: string) => {
//   const currentNode = nodeMap.value[focusUid.value];
//   if (currentNode.layout) {
//     currentNode.layout.flexDirection = layout;
//   }
//   dispatch.updateNodeMap(
//     Object.assign({}, nodeMap.value, {
//       root: currentNode,
//     })
//   );
// };
</script>
../../../FlexSettingControl