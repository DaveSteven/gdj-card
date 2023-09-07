import { createApp, defineComponent, h, onMounted, ref } from 'vue';

export function createContextMenu() {
  const contextMenuComponent = defineComponent({
    name: 'ContextMenu',
    setup(_, { expose }) {
      const menuRef = ref();
      const isOpened = ref(true);

      const handleClickOut = (e: Event) => {
        console.log(menuRef.value);
        if (
          !e.target ||
          !menuRef.value ||
          menuRef.value.contains(e.target as HTMLElement)
        ) {
          return;
        }
        if (isOpened.value) {
          e.preventDefault();
          vm.$el?.parentNode?.removeChild(vm.$el);
          isOpened.value = false;
        }
      };

      onMounted(() => {
        document.body.addEventListener('click', handleClickOut, true);
      });

      return () => {
        const menus = h(
          'div',
          {
            ref: menuRef,
            '^role': 'contextmenu',
            class: 'bg-white',
          },
          h('ul', null, h('li', '选中'))
        );
        return menus;
      };
    },
  });

  const contextMenuInstance = createApp(contextMenuComponent);
  const vm = contextMenuInstance.mount(document.createElement('div'));

  const open = () => {};

  const close = () => {
    contextMenuInstance.unmount();
  };

  return {
    vm,
    close,
  };
}
