<template>
  <UContainer class="py-8 space-y-6">
    <ListingBackLink />
    <div class="grid gap-8 lg:grid-cols-2">
      <ListingGallery :images="listing.imgUrls" :title="listing.title" />
      <div class="space-y-6">
        <ListingDetails :listing="listing" />
        <ListingDeleteButton :listing-id="listing.id" />
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default defineNuxtComponent({
  name: 'ListingView',
  props: {
    listing: {
      type: Object as PropType<Listing>,
      required: true,
    },
  },
})
</script>
