<template>
  <div class="space-y-3">
    <UAlert v-if="error" color="error" variant="subtle" icon="i-lucide-circle-alert" :title="error" />
    <p v-if="imgUrls.length === 0" class="text-sm text-muted">No images yet: it will be published without images.</p>
    <div class="flex flex-col gap-2 sm:flex-row">
      <UButton
        label="Approve and publish"
        icon="i-lucide-check"
        :loading="publishing"
        :disabled="rejecting || uploading"
        class="justify-center"
        @click="publish"
      />
      <UModal v-model:open="confirmReject" title="Reject listing?" description="It stays hidden and its images are deleted. The scraper won't add it again.">
        <UButton label="Reject" icon="i-lucide-x" color="error" variant="soft" :disabled="publishing" class="justify-center" />

        <template #body>
          <div class="space-y-4">
            <ListingSourceLink v-if="source && sourceUrl" :source="source" :url="sourceUrl" />
            <div class="flex justify-end gap-2">
              <UButton label="Cancel" color="neutral" variant="ghost" @click="confirmReject = false" />
              <UButton label="Reject" color="error" :loading="rejecting" @click="reject" />
            </div>
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

// Approve (with the images picked on the review page) or reject a pending listing.
export default defineNuxtComponent({
  name: 'ListingReviewActions',
  props: {
    listingId: {
      type: String,
      required: true,
    },
    imgUrls: {
      type: Array as PropType<string[]>,
      required: true,
    },
    uploading: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String as PropType<string | null>,
      default: null,
    },
    sourceUrl: {
      type: String as PropType<string | null>,
      default: null,
    },
  },
  data() {
    return {
      publishing: false,
      rejecting: false,
      confirmReject: false,
      error: null as string | null,
    }
  },
  methods: {
    async publish() {
      this.publishing = true
      this.error = null
      try {
        await this.$api.publishListing(this.listingId, this.imgUrls)
        await this.$router.push(`/listings/${this.listingId}`)
      }
      catch (error) {
        this.error = apiErrorMessage(error, 'Could not publish the listing, try again')
      }
      finally {
        this.publishing = false
      }
    },
    async reject() {
      this.rejecting = true
      this.error = null
      try {
        await this.$api.rejectListing(this.listingId)
        this.confirmReject = false
        await this.$router.push('/admin/listings/pending')
      }
      catch (error) {
        this.confirmReject = false
        this.error = apiErrorMessage(error, 'Could not reject the listing, try again')
      }
      finally {
        this.rejecting = false
      }
    },
  },
})
</script>
