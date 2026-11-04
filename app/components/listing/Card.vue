<template>
  <NuxtLink :to="`/listings/${listing.id}`" class="group block h-full">
    <UCard class="h-full overflow-hidden transition group-hover:ring-primary" :ui="{ body: 'p-0 sm:p-0' }">
      <ListingImage :src="listing.primaryImgUrl" :alt="listing.title" class="aspect-[4/3]" />
      <div class="p-4 space-y-1">
        <h2 class="font-semibold truncate">{{ listing.title }}</h2>
        <p class="text-primary font-medium">{{ price }}</p>
      </div>
    </UCard>
  </NuxtLink>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default defineNuxtComponent({
  name: 'ListingCard',
  props: {
    listing: {
      type: Object as PropType<Listing>,
      required: true,
    },
  },
  computed: {
    price(): string {
      return formatPrice(this.listing.price)
    },
  },
})
</script>
