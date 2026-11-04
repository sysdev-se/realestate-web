<template>
  <ListingView :listing="listing" />
</template>

<script lang="ts">
import type { NuxtApp } from '#app'

interface Loaded {
  listing: Listing
}

export default defineNuxtComponent({
  name: 'ListingPage',
  async asyncData(nuxtApp: NuxtApp) {
    const id = String(useRoute().params.id)
    try {
      const loaded: Loaded = { listing: await nuxtApp.$api.getListing(id) }
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
    // head() can't read component data, so the title comes from here.
    useHead(() => ({
      title: `${this.listing.title} — Realestate`,
      meta: [
        { name: 'description', content: this.listing.description?.slice(0, 160) || `${this.listing.title}, ${formatPrice(this.listing.price)}` },
        { property: 'og:image', content: this.listing.primaryImgUrl ?? undefined },
      ],
    }))
  },
})
</script>
