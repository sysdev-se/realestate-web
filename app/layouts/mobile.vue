<template>
  <div class="min-h-screen flex flex-col">
    <AppHeaderMobile />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'MobileLayout',
})
</script>
