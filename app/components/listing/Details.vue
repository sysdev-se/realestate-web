<template>
  <div class="space-y-3">
    <UBadge :label="typeLabel" color="neutral" variant="subtle" />
    <h1 class="text-2xl font-bold sm:text-3xl">{{ listing.title }}</h1>
    <p class="text-xl text-primary font-semibold">{{ price }}</p>
    <p v-if="facts" class="text-muted">{{ facts }}</p>
    <p v-if="listing.description" class="text-muted whitespace-pre-line">{{ listing.description }}</p>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default defineNuxtComponent({
  name: 'ListingDetails',
  props: {
    listing: {
      type: Object as PropType<Listing>,
      required: true,
    },
  },
  computed: {
    typeLabel(): string {
      return formatListingType(this.listing.type)
    },
    price(): string {
      return formatPrice(this.listing)
    },
    facts(): string {
      return formatFacts(this.listing)
    },
  },
})
</script>
