<template>
  <header class="sticky top-0 z-50 border-b border-default bg-default/75 backdrop-blur">
    <UContainer class="flex h-14 items-center justify-between">
      <AppLogo />
      <USlideover v-model:open="open" title="Menu" side="right">
        <UButton icon="i-lucide-menu" color="neutral" variant="ghost" aria-label="Open menu" />

        <template #body>
          <div class="flex flex-col gap-6" @click="closeOnLink">
            <AppNav orientation="vertical" />
            <USeparator />
            <AuthAccount block />
          </div>
        </template>
      </USlideover>
    </UContainer>
  </header>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'AppHeaderMobile',
  data() {
    return {
      open: false,
    }
  },
  watch: {
    // Close the menu once a link has taken us somewhere.
    '$route.fullPath'() {
      this.open = false
    },
  },
  methods: {
    closeOnLink(event: MouseEvent) {
      if ((event.target as HTMLElement).closest('a')) {
        this.open = false
      }
    },
  },
})
</script>
