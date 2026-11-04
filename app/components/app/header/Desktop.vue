<template>
  <header class="sticky top-0 z-50 border-b border-default bg-default/75 backdrop-blur">
    <UContainer class="flex h-16 items-center gap-8">
      <AppLogo />
      <AppNav class="flex-1" />
      <AuthAccount />
    </UContainer>
  </header>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'AppHeaderDesktop',
})
</script>
