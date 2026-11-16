<template>
  <UContainer class="py-8 space-y-6">
    <div class="space-y-1">
      <h1 class="text-2xl font-bold">Pending listings</h1>
      <p class="text-muted">Found by the scrapers. Approve a listing to publish it, or reject it to keep it out for good.</p>
    </div>
    <ListingGrid v-if="result.content.length > 0" :listings="result.content" link-prefix="/admin/listings/" />
    <UEmpty v-else icon="i-lucide-inbox" title="Nothing to review" description="New listings from the scrapers show up here." />
    <ListingPagination :page="page" :total="result.page.totalElements" @change="(value: number) => $emit('change', value)" />
  </UContainer>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default defineNuxtComponent({
  name: 'ListingPendingBrowser',
  props: {
    page: {
      type: Number,
      required: true,
    },
    result: {
      type: Object as PropType<PagedModel<Listing>>,
      required: true,
    },
  },
  emits: {
    change: (_page: number) => true,
  },
})
</script>
