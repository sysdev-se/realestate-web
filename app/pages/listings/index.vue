<template>
  <ListingBrowser :query="query" :result="result" @change="show" />
</template>

<script lang="ts">
import type { NuxtApp } from '#app'

interface Loaded {
  query: ListingQuery
  result: PagedModel<Listing>
}

export default defineNuxtComponent({
  name: 'ListingsPage',
  async asyncData(nuxtApp: NuxtApp) {
    const query = parseListingQuery(useRoute().query)
    const loaded: Loaded = { query, result: await nuxtApp.$api.listListings(query) }
    return { loaded }
  },
  head() {
    return {
      title: 'Listings — Realestate',
      meta: [
        { name: 'description', content: 'Houses and apartments for sale.' },
      ],
    }
  },
  computed: {
    // asyncData's result isn't typed on `this` (defineNuxtComponent is typed as
    // defineComponent), so it's exposed through these.
    query(): ListingQuery {
      return (this as unknown as { loaded: Loaded }).loaded.query
    },
    result(): PagedModel<Listing> {
      return (this as unknown as { loaded: Loaded }).loaded.result
    },
  },
  methods: {
    show(query: ListingQuery) {
      this.$router.push({ path: '/listings', query: toRouteQuery(query) })
    },
  },
})
</script>
