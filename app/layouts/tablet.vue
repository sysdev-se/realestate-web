<template>
  <div class="min-h-screen flex flex-col">
    <AppHeaderTablet />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'TabletLayout',
})
</script>
