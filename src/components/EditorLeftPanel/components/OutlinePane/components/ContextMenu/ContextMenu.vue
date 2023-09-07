<template>
  <div ref="menuRef" v-if="isOpened" class="menu-wrapper">
    <ul class="menu-list">
      <li>
        <a>选中</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isOpened = ref(true);
const menuRef = ref<HTMLElement>();

const show = () => {
  console.log(menuRef.value?.hasChildNodes());
};

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
  }
};

onMounted(() => {
  document.body.addEventListener('click', handleOutClick, true);
});

defineExpose({
  show,
});
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
