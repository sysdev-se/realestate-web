<template>
  <UContainer class="py-8 space-y-6">
    <ListingToolbar :title="query.title" :sort="query.sort" @change="change" />
    <ListingGrid v-if="result.content.length > 0" :listings="result.content" />
    <ListingEmpty v-else :searched="query.title !== ''" />
    <ListingPagination :page="query.page" :total="result.page.totalElements" @change="(page: number) => change({ page })" />
  </UContainer>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default defineNuxtComponent({
  name: 'ListingBrowser',
  props: {
    query: {
      type: Object as PropType<ListingQuery>,
      required: true,
    },
    result: {
      type: Object as PropType<PagedModel<Listing>>,
      required: true,
    },
  },
  emits: {
    change: (_query: ListingQuery) => true,
  },
  methods: {
    // A new search or sort starts at page 1.
    change(changes: Partial<ListingQuery>) {
      const page = changes.page ?? 1
      this.$emit('change', { ...this.query, ...changes, page })
    },
  },
})
</script>
