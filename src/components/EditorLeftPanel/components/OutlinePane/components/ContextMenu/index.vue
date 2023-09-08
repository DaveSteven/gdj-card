<template>
  <div
    ref="menuRef"
    v-if="isOpened"
    class="menu-wrapper"
    :style="positionStyle"
  >
    <ul class="menu-list">
      <li>
        <a>选中</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  DefineComponent,
  onMounted,
  ref,
  computed,
} from 'vue';

export default defineComponent({
  name: 'ContextMenu',
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
    position: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const isOpened = ref(false);
    const menuRef = ref<HTMLElement>();
    const positionStyle = computed(() => {
      return {
        left: `${props.position.x}px`,
        top: `${props.position.y}px`,
      };
    });

    const handleOutClick = (e: Event) => {
      if (
        !e.target ||
        !menuRef.value ||
        menuRef.value.contains(e.target as HTMLElement)
      ) {
        return;
      }
      if (isOpened.value) {
        e.preventDefault();
        isOpened.value = false;
        if (menuRef.value && menuRef.value.parentNode) {
          document.body.removeChild(menuRef.value.parentNode);
        }
      }
    };

    onMounted(() => {
      document.body.addEventListener('click', handleOutClick, true);
    });

    return {
      menuRef,
      isOpened,
      positionStyle,
    };
  },
}) as DefineComponent;
</script>
<style scoped lang="scss">
.menu {
  &-wrapper {
    @apply bg-white shadow absolute z-10;
  }

  &-list {
    @apply min-w-150px text-12px;

    > li {
      @apply px-2 py-1 cursor-pointer;

      > a {
        @apply block py-4px px-12px;
      }
    }
  }
}
</style>
