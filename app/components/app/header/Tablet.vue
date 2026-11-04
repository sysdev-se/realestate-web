<template>
  <header class="sticky top-0 z-50 border-b border-default bg-default/75 backdrop-blur">
    <UContainer class="flex h-14 items-center gap-4">
      <AppLogo />
      <AppNav :icons="false" class="flex-1 min-w-0" />
      <AuthAccount />
    </UContainer>
  </header>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'AppHeaderTablet',
})
</script>
