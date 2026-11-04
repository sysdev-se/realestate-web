<template>
  <UPageSection
    title="Lorem ipsum dolor sit amet"
    description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    :features="features"
  />
</template>

<script lang="ts">
import type { PageFeatureProps } from '@nuxt/ui'

export default defineNuxtComponent({
  name: 'HomeIntro',
  data() {
    return {
      features: [
        {
          icon: 'i-lucide-house',
          title: 'Duis aute irure',
          description: 'Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
          icon: 'i-lucide-search',
          title: 'Excepteur sint',
          description: 'Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
          icon: 'i-lucide-images',
          title: 'Sed ut perspiciatis',
          description: 'Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        },
      ] as PageFeatureProps[],
    }
  },
})
</script>
