<template>
  <ListingPendingBrowser :page="page" :result="result" @change="show" />
</template>

<script lang="ts">
import type { NuxtApp } from '#app'

interface Loaded {
  page: number
  result: PagedModel<Listing>
}

definePageMeta({ middleware: 'admin' })

export default defineNuxtComponent({
  name: 'PendingListingsPage',
  async asyncData(nuxtApp: NuxtApp) {
    const page = parseListingQuery(useRoute().query).page
    try {
      const loaded: Loaded = { page, result: await nuxtApp.$api.listAdminListings('PENDING', page) }
      return { loaded }
    }
    catch {
      throw createError({ statusCode: 502, statusMessage: 'Could not load the pending listings' })
    }
  },
  head() {
    return { title: 'Pending listings — Realestate' }
  },
  computed: {
    // asyncData's result isn't typed on `this` (defineNuxtComponent is typed as
    // defineComponent), so it's exposed through these.
    page(): number {
      return (this as unknown as { loaded: Loaded }).loaded.page
    },
    result(): PagedModel<Listing> {
      return (this as unknown as { loaded: Loaded }).loaded.result
    },
  },
  methods: {
    show(page: number) {
      this.$router.push({ path: '/admin/listings/pending', query: { page: page === 1 ? undefined : String(page) } })
    },
  },
})
</script>
