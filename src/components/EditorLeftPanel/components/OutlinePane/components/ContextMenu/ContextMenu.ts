import { createVNode, render, ComponentPublicInstance } from 'vue';
import ContextMenuConstructor from './index.vue';
import { hasOwn } from '@vue/shared';

const initInstance = (props: any, container: HTMLElement) => {
  const vnode = createVNode(ContextMenuConstructor, props);
  render(vnode, container);
  document.body.appendChild(container);
  return vnode.component;
};

const genContainer = () => {
  return document.createElement('div');
};

const mergeProps = (vm: ComponentPublicInstance, options: any) => {
  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
      vm[prop as keyof ComponentPublicInstance] = options[prop];
    }
  }
};

const registerContextMenu = (options: any) => {
  const container = genContainer();
  const instance = initInstance(options, container);
  const vm = instance!.proxy as ComponentPublicInstance<{
    isOpened: boolean;
  }>;

  mergeProps(vm, options);
  return vm;
};

export default (options: any) => {
  const vm = registerContextMenu(options);

  return {
    show: () => {
      vm.isOpened = true;
    }
  }
};
