<template>
  <UContainer class="py-8 space-y-6">
    <ListingBackLink to="/admin/listings/pending" label="Pending listings" />
    <div class="grid gap-8 lg:grid-cols-2">
      <section v-if="pending" class="space-y-2">
        <h2 class="font-semibold">Images</h2>
        <p class="text-sm text-muted">Add the listing's images before approving. The first image is the cover.</p>
        <ListingImageUploader v-model="imgUrls" @busy="(value: boolean) => uploading = value" />
      </section>
      <ListingGallery v-else :images="listing.imgUrls" :title="listing.title" />
      <div class="space-y-6">
        <UBadge :label="status.label" :color="status.color" variant="soft" />
        <ListingDetails :listing="listing" />
        <ListingSourceLink v-if="listing.source && listing.sourceUrl" :source="listing.source" :url="listing.sourceUrl" />
        <ListingReviewActions
          v-if="pending"
          :listing-id="listing.id"
          :img-urls="imgUrls"
          :uploading="uploading"
          :source="listing.source"
          :source-url="listing.sourceUrl"
        />
        <ListingDeleteButton :listing-id="listing.id" />
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts">
import type { PropType } from 'vue'

const STATUSES: Record<PublishedStatus, { label: string, color: 'warning' | 'success' | 'error' }> = {
  PENDING: { label: 'Pending review', color: 'warning' },
  PUBLISHED: { label: 'Published', color: 'success' },
  REJECTED: { label: 'Rejected', color: 'error' },
}

// A listing as admins review it, in any status. While it is pending, the admin picks its images
// here; they are saved when it is approved.
export default defineNuxtComponent({
  name: 'ListingReview',
  props: {
    listing: {
      type: Object as PropType<Listing>,
      required: true,
    },
  },
  data() {
    return {
      imgUrls: [...this.listing.imgUrls],
      uploading: false,
    }
  },
  computed: {
    status(): { label: string, color: 'warning' | 'success' | 'error' } {
      return STATUSES[this.listing.publishedStatus]
    },
    pending(): boolean {
      return this.listing.publishedStatus === 'PENDING'
    },
  },
})
</script>
