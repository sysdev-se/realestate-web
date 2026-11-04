<template>
  <UPageHero
    title="Find your next home"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    :links="links"
  />
</template>

<script lang="ts">
import type { ButtonProps } from '@nuxt/ui'

export default defineNuxtComponent({
  name: 'HomeHero',
  data() {
    return {
      links: [
        { label: 'Browse listings', to: '/listings', icon: 'i-lucide-building-2', size: 'xl' },
      ] as ButtonProps[],
    }
  },
})
</script>
