<template>
  <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <li v-for="listing in listings" :key="listing.id">
      <ListingCard :listing="listing" />
    </li>
  </ul>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default defineNuxtComponent({
  name: 'ListingGrid',
  props: {
    listings: {
      type: Array as PropType<Listing[]>,
      required: true,
    },
  },
})
</script>
