<template>
  <ListingReview :listing="listing" />
</template>

<script lang="ts">
import type { NuxtApp } from '#app'

interface Loaded {
  listing: Listing
}

definePageMeta({ middleware: 'admin' })

export default defineNuxtComponent({
  name: 'ReviewListingPage',
  async asyncData(nuxtApp: NuxtApp) {
    const id = String(useRoute().params.id)
    try {
      const loaded: Loaded = { listing: await nuxtApp.$api.getAdminListing(id) }
      return { loaded }
    }
    catch (error) {
      const notFound = [400, 404].includes(apiErrorStatus(error) ?? 0)
      throw createError({
        statusCode: notFound ? 404 : 502,
        statusMessage: notFound ? 'Listing not found' : 'Could not load the listing',
      })
    }
  },
  computed: {
    // asyncData's result isn't typed on `this` (defineNuxtComponent is typed as
    // defineComponent), so it's exposed through this.
    listing(): Listing {
      return (this as unknown as { loaded: Loaded }).loaded.listing
    },
  },
  created() {
    useHead(() => ({ title: `Review: ${this.listing.title} — Realestate` }))
  },
})
</script>
