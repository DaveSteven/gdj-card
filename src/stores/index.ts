import { BaseNode, DEFAULT_ROOT_ID, LayerType, NodeMap } from '@/utils/renderer';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNodeStore = defineStore('nodeStore', () => {
  const nodeMap = ref<NodeMap>({
    root: {
      uid: DEFAULT_ROOT_ID,
      parentUid: undefined,
      children: [],
      type: LayerType.Template,
      layout: {},
      style: {},
    },
  });

  const currentUid = ref(DEFAULT_ROOT_ID);
  const focusUid = ref();

  const setCurrentUid = (uid: string) => {
    currentUid.value = uid;
  };

  const setFocusUid = (uid: string) => {
    focusUid.value = uid;
  };

  const setNodeMap = (uid: string, data: BaseNode) => {
    nodeMap.value[uid] = data;
  };

  return {
    nodeMap,
    currentUid,
    focusUid,
    setCurrentUid,
    setFocusUid,
    setNodeMap,
  };
});
