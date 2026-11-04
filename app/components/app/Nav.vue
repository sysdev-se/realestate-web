<template>
  <UNavigationMenu :items="items" :orientation="orientation" />
</template>

<script lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { PropType } from 'vue'

export default defineNuxtComponent({
  name: 'AppNav',
  props: {
    orientation: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
    // Labels only, for the narrower tablet header.
    icons: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // The admin link depends on the browser-only session; adding it only after mounting
      // keeps the server HTML and the first browser render identical.
      mounted: false,
    }
  },
  computed: {
    items(): NavigationMenuItem[] {
      const items: NavigationMenuItem[] = [
        { label: 'Home', to: '/', icon: 'i-lucide-house', exact: true },
        { label: 'Listings', to: '/listings', icon: 'i-lucide-building-2' },
      ]
      if (this.mounted && this.$auth.isAdmin) {
        items.push({ label: 'Create Listing', to: '/admin/listings/new', icon: 'i-lucide-plus' })
      }
      return this.icons ? items : items.map(({ icon: _icon, ...item }) => item)
    },
  },
  mounted() {
    this.mounted = true
  },
})
</script>
